Title: Ant: If-else conditionals
{{wl-tags:ant|ant-condition}}{{wl-publish: 2012-12-09 16:16:55 -0500 | Denevell }}

You can create normal conditionals via:

     <condition property="property_to_create" 
       value="value_to_set_as" 
       else="if_below_isnt_true">
      <isset property="another_property" />
     </condition>

The above sets a new property 'property_to_create' with the value 'value_to_set_as' if the property 'another_property' exists, else 'property_to_create' will have the value 'if_below_isnt_true'
