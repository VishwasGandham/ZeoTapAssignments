document.addEventListener("DOMContentLoaded", function() {
  const chatWindow = document.getElementById("chatWindow");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  sendBtn.addEventListener("click", function(){
      let question = userInput.value.trim();
      if(question !== "") {
          addMessage("user", question);
          let response = getResponse(question);
          setTimeout(() => {
              addMessage("agent", response);
              chatWindow.scrollTop = chatWindow.scrollHeight;
          }, 500);
          userInput.value = "";
      }
  });

  userInput.addEventListener("keypress", function(e) {
      if(e.key === "Enter") {
          sendBtn.click();
      }
  });

  function addMessage(sender, text) {
      let msgDiv = document.createElement("div");
      msgDiv.classList.add("chat-message", sender);
      msgDiv.textContent = text;
      chatWindow.appendChild(msgDiv);
  }

  function getResponse(question) {
      question = question.toLowerCase();
      // Basic keyword-based responses
      if(question.includes("segment")) {
          if(question.includes("set up") || question.includes("new source")) {
              return "To set up a new source in Segment, log in to your account, navigate to 'Sources', click 'Add Source', and follow the on-screen instructions. More details: https://segment.com/docs/?ref=nav";
          }
          return "For Segment-related queries, please refer to the official docs: https://segment.com/docs/?ref=nav";
      } else if(question.includes("mparticle") || question.includes("mparticle")) {
          if(question.includes("user profile") || question.includes("create")) {
              return "To create a user profile in mParticle, head to the user management section of your dashboard and follow the steps. More info: https://docs.mparticle.com/";
          }
          return "For mParticle-related questions, please consult: https://docs.mparticle.com/";
      } else if(question.includes("lytics") || question.includes("lytics")) {
          if(question.includes("audience") || question.includes("segment")) {
              return "To build an audience segment in Lytics, go to the Audience section, set your criteria, and create the segment. Detailed instructions: https://docs.lytics.com/";
          }
          return "For Lytics queries, please see: https://docs.lytics.com/";
      } else if(question.includes("zeotap")) {
          if(question.includes("integrate") || question.includes("data")) {
              return "To integrate your data with Zeotap, follow the integration guide in your Zeotap dashboard. More details: https://docs.zeotap.com/home/en-us/";
          }
          return "For Zeotap-related questions, please refer to: https://docs.zeotap.com/home/en-us/";
      } else {
          return "I'm sorry, I can only answer how-to questions related to Segment, mParticle, Lytics, and Zeotap.";
      }
  }
});
