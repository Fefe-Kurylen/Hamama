package fr.kurylen.hamama;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.os.Build;
import android.os.IBinder;
import androidx.core.app.NotificationCompat;

/**
 * Service de premier plan : garde Hamama actif quand l'appli est en arrière-plan,
 * pour que la surveillance IDLE du moteur mail reçoive les nouveaux messages en temps réel
 * et que les notifications partent même écran éteint. Aucun serveur : tout reste sur le téléphone.
 */
public class MailService extends Service {
    static final String CHANNEL = "hamama-bg";
    static final int ID = 4242;

    static void start(Context c) {
        Intent i = new Intent(c, MailService.class);
        if (Build.VERSION.SDK_INT >= 26) c.startForegroundService(i); else c.startService(i);
    }
    static void stop(Context c) { c.stopService(new Intent(c, MailService.class)); }

    @Override public int onStartCommand(Intent intent, int flags, int startId) {
        NotificationManager nm = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= 26 && nm.getNotificationChannel(CHANNEL) == null) {
            NotificationChannel ch = new NotificationChannel(CHANNEL, "Réception en arrière-plan", NotificationManager.IMPORTANCE_MIN);
            ch.setDescription("Garde Hamama prêt à recevoir vos mails. Vous pouvez masquer cette notification.");
            ch.setShowBadge(false);
            nm.createNotificationChannel(ch);
        }
        Intent open = new Intent(this, MainActivity.class).setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pi = PendingIntent.getActivity(this, 0, open, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
        Notification n = new NotificationCompat.Builder(this, CHANNEL)
            .setSmallIcon(getApplicationInfo().icon)
            .setContentTitle("Hamama")
            .setContentText("Réception des mails en temps réel")
            .setContentIntent(pi)
            .setOngoing(true).setSilent(true).setShowWhen(false)
            .setPriority(NotificationCompat.PRIORITY_MIN)
            .setCategory(NotificationCompat.CATEGORY_SERVICE)
            .build();
        if (Build.VERSION.SDK_INT >= 34) startForeground(ID, n, ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE);
        else startForeground(ID, n);
        return START_STICKY;
    }

    @Override public IBinder onBind(Intent intent) { return null; }
}
