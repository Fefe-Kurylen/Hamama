package fr.kurylen.hamama;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.PowerManager;
import android.provider.Settings;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/** Pont JS ↔ service d'arrière-plan (window.Capacitor.Plugins.HamamaBg). */
@CapacitorPlugin(name = "HamamaBg")
public class HamamaBgPlugin extends Plugin {
    @PluginMethod public void start(PluginCall call) {
        try { MailService.start(getContext()); call.resolve(); } catch (Exception e) { call.reject(e.getMessage()); }
    }
    @PluginMethod public void stop(PluginCall call) { MailService.stop(getContext()); call.resolve(); }

    /** Économie de batterie : sans exemption, Android coupe le réseau des applis en veille (Doze). */
    @PluginMethod public void battery(PluginCall call) {
        JSObject r = new JSObject();
        PowerManager pm = (PowerManager) getContext().getSystemService(Context.POWER_SERVICE);
        boolean free = Build.VERSION.SDK_INT < 23 || pm.isIgnoringBatteryOptimizations(getContext().getPackageName());
        if (!free && call.getBoolean("ask", false)) {
            try {
                Intent i = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS, Uri.parse("package:" + getContext().getPackageName()));
                i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                getContext().startActivity(i);
            } catch (Exception ignored) {}
        }
        r.put("free", free);
        call.resolve(r);
    }
}
