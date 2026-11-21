package fr.kurylen.hamama;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override public void onCreate(Bundle savedInstanceState) {
        registerPlugin(HamamaBgPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
