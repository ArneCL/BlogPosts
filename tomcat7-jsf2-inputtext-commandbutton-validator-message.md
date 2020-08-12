title: JSF2: InputText, CommandButton, Validator and Message
tags: java-jsf-inputtext,java-jsf-commandbutton,java-jsf-validators,java-jsf-message,java-jsf,java
date: 2013-03-23 10:41:00

If you html tag, assign these new namespaces to access jsf functionality:

    xmlns:h="http://java.sun.com/jsf/html"
    xmlns:f="http://java.sun.com/jsf/core"

Then you can make a form tag, with an inputtext, validator, commandbutton and message.

    <h:form>
        <p><h:inputText
                id="userNo"
                validatorMessage="Error!"
                title="Type a number from 1 to 9:"
                value="1">
                <f:validateLongRange
                    minimum="1"
                    maximum="9"/>
            </h:inputText>
        
            <h:commandButton id="submit" value="Submit"
                             action="response"/>
        </p>
        <h:message showSummary="true" showDetail="false"
                   style="color: #d20005;
                   id="errors1"
                   for="userNo"/>
    </h:form>

The inputText is similar to its HTML equivalent except it has a validatorMessage that we'll use later. Within the tag, we hve a standard validator that checks to see if the input is between two values.

Then the command button is pressed. Note the action goes nowhere at the moment since we don't ahve a response.xhtml file.

Finally the message tag is filled with the validator message from the input tag if the input is not between 1 and 9. It uses the id tag of the inputText to associate.

You can get all the JSF tag here: http://docs.oracle.com/cd/E17802_01/j2ee/javaee/javaserverfaces/2.0/docs/pdldocs/facelets/overview-summary.html
