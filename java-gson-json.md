Tags:  json|android|gson|java
Date: 2012-11-23 16:13:11 -0500 
Author: Denevell

First download Google's Gson.

This example will simply convert some JSON into a an object, where the JSON's properties equal the fields in the object:

     public class Example {
        private String text;
        public String getText() {
          return text;
        }
        public void setText(String text) {
          this.text = text;
        }
      }

     new Gson().fromJson("{'text':'text'}", Example.class);
  
To do the same this with arrays, just pass in a JSON array and set the class type to be an array (I used a traditional Example[] object).

To create custom mappings between JSON properties and object class fields, you need to register a type adapter:

      public class OtherExample {
        private String other;
        public String getOther() {
          return other;
        }
        public void setText(String other) {
          this.other = other;
        }
      }
      
      public class JsonAdapter implements JsonDeserializer<OtherExample> {
        @Override
        public OtherExample deserialize(JsonElement json, Type typeOfT,
                                    JsonDeserializationContext context)
                                    throws JsonParseException {
          //parse the JsonElement here and return your OtherExample object
          }
      }
      
      Gson gson = new GsonBuilder()
                  .registerTypeAdapter(OtherExample.class,
                                       new JsonAdapter()).create();
      gson.fromJson("{'text':'text'}", OtherExample.class);
