title: Android progress spinner in Actionbar
tags: android,android-progress

You can get a indeterminate progress bar like http://i.stack.imgur.com/CY4Ss.png in your window or Actionbar easily enough:

0. Inserting this before you set your view in onCreate: requestWindowFeature(Window.FEATURE_INDETERMINATE_PROGRESS);
0. Enable and disabling it via  setProgressBarIndeterminateVisibility(true);

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            requestWindowFeature(Window.FEATURE_INDETERMINATE_PROGRESS);
            setContentView(R.layout.activity_main);
        
            setProgressBarIndeterminateVisibility(true);
            ...
            setProgressBarIndeterminateVisibility(false);
        }
    
You can also use this in ActionbarSherlock via setSupportProgressBarIndeterminateVisibility and using ABS's Window class for the feature instead.
