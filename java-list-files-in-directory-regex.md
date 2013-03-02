Tags:  java|java-io|java-regex
Title: Java: List all the files in a directory based on a regex

If you define a regular expression with Pattern, then use the matcher() and matches() methods on that within a File's listFiles() method, you will get back a list of the files in the File's directory based on the regex.

    final Pattern p = Pattern.compile(regex);
    File[] pagesTemplates = file.listFiles(new FileFilter() {
        @Override
        public boolean accept(File f) {
           	return p.matcher(f.getName()).matches();
        }
    });
