package com.reactnativetypescript;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import com.microsoft.codepush.react.CodePush;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "reactnativetypescript";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
}
