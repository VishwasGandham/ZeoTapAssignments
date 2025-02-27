# Assignment 2: CDP Support Agent Chatbot

This chatbot answers “how-to” questions about four Customer Data Platforms (CDPs): Segment, mParticle, Lytics, and Zeotap by using simple keyword-based matching to provide guidance and direct links to their official documentation.

## Files

- **chatbot.html**: Main HTML file for the chatbot interface.
- **chatbot.css**: CSS for styling the chatbot.
- **chatbot.js**: JavaScript containing logic for processing and responding to questions.

## How to Run

1. Open `chatbot.html` in your web browser.
2. Type your question into the input field and click **Send** (or press Enter).

## Features

- Answers CDP-related how-to questions.
- Provides links to official documentation for further information.
- Uses basic keyword matching for responses.

## Non-Functional Enhancements

- **Security:** Input fields validate that queries are not empty and handle unexpected input gracefully.
- **Performance:** The chatbot is designed with minimal processing delay, ensuring quick responses by using a simple keyword matching approach.

## Testing

- Example: "How do I set up a new source in Segment?" should return a helpful response with a link to Segment’s documentation.
- If an irrelevant question is asked, the chatbot informs you it only answers CDP-related questions.
