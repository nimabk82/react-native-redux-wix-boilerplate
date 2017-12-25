package com.reactnativereduxwixboilerplate;

import android.app.Application;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
 import com.reactnativenavigation.NavigationApplication;

 public class MainApplication extends NavigationApplication {
     private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

     protected static CallbackManager getCallbackManager() {
         return mCallbackManager;
     }

     @Override
     public void onCreate() {
         super.onCreate();
         FacebookSdk.sdkInitialize(getApplicationContext());
         AppEventsLogger.activateApp(this);
     }

     @Override
     public boolean isDebug() {
         // Make sure you are using BuildConfig from your own application
         return BuildConfig.DEBUG;
     }

     @Override
         public String getJSMainModuleName() {
             return "index";
         }

     protected List<ReactPackage> getPackages() {
         // Add additional packages you require here
         // No need to add RnnPackage and MainReactPackage
         return Arrays.<ReactPackage>asList(
             new VectorIconsPackage(),
             new LinearGradientPackage(),
             new RNFirebasePackage(),
             new FBSDKPackage(mCallbackManager)
         );
     }

     @Override
     public List<ReactPackage> createAdditionalReactPackages() {
         return getPackages();
     }
 }
