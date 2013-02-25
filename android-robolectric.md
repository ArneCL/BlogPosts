{{wl-tags: android|robolectric|robolectric-setup|android-testing}}{{wl-publish: 2012-11-21 16:15:10 -0500 | Denevell }}

Setting up Robolectric is such a ballache.

# In your main project, create a test directory at its root project level.
# Create a new normal Java project, removing the 'src' directory in the setup screens, and linking to the test directory you created above, and adding your main project as a dependency
# Add Junit4, your Android API jar, the Android maps jar and the Robolectric jar (the one with all dependencies) to your build path for the java project.
# Create a new run configuration for a normal junit configuration, with junit 4 as its test runner, running all the tests in your java project, and with the eclipse junit launcher. And under the arguments tab, set the working directory to be your main project.
# Create this test class and use the run configuration you made above:

     package com.example.robolectric;
     import static org.hamcrest.CoreMatchers.equalTo;
     import static org.junit.Assert.assertThat;
     import org.denevell.twunter.MainActivity;
     import org.denevell.twunter.R;import org.junit.Test;
     import org.junit.runner.RunWith; 
     import com.xtremelabs.robolectric.RobolectricTestRunner; 
    
     @RunWith(RobolectricTestRunner.class)
     public class TestTest {
        @Test
        public void shouldHaveHappySmiles() throws Exception {
            String hello = new MainActivity().getResources().getString(R.string.hello_world);
            assertThat(hello, equalTo("Hello world!"));
        }
     }

