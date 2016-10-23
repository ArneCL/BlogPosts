Title: Android: Testing fragments
Tags: android|android-testing|android-fragments
Date: 2012-12-18 11:53:37 -0500 

Update: I would not recomment this anymore. Although it may work, there are new mockito testing tutorials on the Android documentation site, which you should look at first. And, these days, I use the MVP architecture, allowing me to place all the logic in the presenter layer, which I then test via normal Java unit testing tools in isolation from the Android specfic code, and test the UI, including the fragments, with the UI testing library and framework, Espresso.


If you want to test a fragment in isolation, you need to create a Test FragmentActivity so your test can use that. The test activity will look something like this. Remember to declare it in your application's manifest:

     public class TestFragmentActivity extends FragmentActivity {
       @Override
       protected void onCreate(Bundle arg0) {
         super.onCreate(arg0);
         setContentView(R.layout.activity_fortests);
       }
     }

Layout:

     <RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        >
       <LinearLayout
            android:id="@+id/activity_test_fragment_linearlayout"
            android:layout_width="fill_parent"
            android:layout_height="fill_parent"
            android:layout_centerHorizontal="true"
            android:layout_centerVertical="true"
            />
     </RelativeLayout>

AndroidManifest:

     ...
     <activity
      android:name="your.package.name.TestFragmentActivity">
     </activity>
     ...

Then in your test project, you can have a class like this to start the fragment:

      public class FrameworkObjectsGeneratorFragmentTest 
          extends ActivityInstrumentationTestCase2<TestFragmentActivity> {
        private TestFragmentActivity mActivity;
     
        public FrameworkObjectsGeneratorFragmentTest() {
          super(TestFragmentActivity.class);
        }
     
        @Override
        protected void setUp() throws Exception {
          super.setUp();
          mActivity = getActivity();
        }
      
        private Fragment startFragment(Fragment fragment) {
          FragmentTransaction transaction = mActivity.getSupportFragmentManager().beginTransaction();
          transaction.add(R.id.activity_test_fragment_linearlayout, fragment, "tag");
          transaction.commit();
          getInstrumentation().waitForIdleSync();
          Fragment frag = mActivity.getSupportFragmentManager().findFragmentByTag("tag");
          return frag;
        }
     
       public void testFragment() {
          FrameworkObjectsGeneratorFragment fragment = new FrameworkObjectsGeneratorFragment() {
             //Override methods and add assertations here.
          };
      
          Fragment frag = startFragment(fragment);
        }
      }

The startFragment() method adds a fragment you specify to the ViewGroup in the TestActivity. 

The good thing about testing fragments, as opposed to Activities, is that you can extends the Fragment to override protected fields and methods within which you can add assertions.
