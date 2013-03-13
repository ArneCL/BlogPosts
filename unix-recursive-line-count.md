title: Unix: Counting lines in a directory including sub directories
tags: unix, unix-wc, unix-xargs

Below will look for all the java files in the src/ directory, piping each file found to 'wc -l' which will count the lines there.

You get a total at the bottom.

    $ find src/ -name '*.java' | xargs wc -l
       31 src/main/java/org/denevell/rocklobster/BlogFileCreationUtils.java
       20 src/main/java/org/denevell/rocklobster/BlogMarkdownUtils.java
       86 src/main/java/org/denevell/rocklobster/utils/ClassUtils.java
       39 src/main/java/org/denevell/rocklobster/utils/PaginationUtils.java
       30 src/main/java/org/denevell/rocklobster/utils/LogUtils.java
       51 src/main/java/org/denevell/rocklobster/utils/FileUtils.java
       42 src/main/java/org/denevell/rocklobster/utils/GitUtils.java
       42 src/main/java/org/denevell/rocklobster/utils/MetadataUtils.java
       39 src/main/java/org/denevell/rocklobster/plugins/SinglePageTagsPlugin.java
       45 src/main/java/org/denevell/rocklobster/plugins/PrettyDatePlugin.java
       48 src/main/java/org/denevell/rocklobster/plugins/AllTagsPlugin.java
       52 src/main/java/org/denevell/rocklobster/plugins/infrastructure/TemplatePluginsContextImpl.java
       10 src/main/java/org/denevell/rocklobster/plugins/infrastructure/Plugin.java
        8 src/main/java/org/denevell/rocklobster/plugins/infrastructure/TemplatePluginsContext.java
       55 src/main/java/org/denevell/rocklobster/blogposts/BlogPost.java
       68 src/main/java/org/denevell/rocklobster/templates/PaginatedPageTemplate.java
       58 src/main/java/org/denevell/rocklobster/templates/SinglePageTemplate.java
       42 src/main/java/org/denevell/rocklobster/templates/PageTemplate.java
       33 src/main/java/org/denevell/rocklobster/templates/FilteredPaginatedPageTemplate.java
       86 src/main/java/org/denevell/rocklobster/templates/infrastructure/FilteredPaginatedPageTemplateFactory.java
       25 src/main/java/org/denevell/rocklobster/templates/infrastructure/SinglePageTemplateFactory.java
       48 src/main/java/org/denevell/rocklobster/templates/infrastructure/PaginatedPageTemplateFactory.java
       30 src/main/java/org/denevell/rocklobster/templates/infrastructure/PageTemplateFactory.java
       54 src/main/java/org/denevell/rocklobster/Main.java
      129 src/main/java/org/denevell/rocklobster/BlogPostParsing.java
     1171 total

