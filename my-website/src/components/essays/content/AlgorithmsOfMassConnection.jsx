// src/components/essays/content/AlgorithmsOfMassConnection.jsx
import React from 'react';
import EssayTemplate from '../EssayTemplate';  // Go up one level since they're in the same folder
import essayImage from '../../../assets/amd_title_pic.png'; // Update this path

// Image configuration object - easily adjust dimensions here
const imageConfig = {
  width: '600px',     // Maximum width of the image
  spacing: {
    top: '48px',      // Space between author and image
    bottom: '48px'    // Space between image and text
  }
};


const AlgorithmsOfMassConnection = () => {
  return (
    <EssayTemplate
      title="Algorithms of Mass Division"
      author="ALEXANDER WOLFGANG HUMPERT"
      date="February 21, 2025"
    >
      <div style={{ 
        marginTop: imageConfig.spacing.top, 
        marginBottom: imageConfig.spacing.bottom 
      }}>
        <img 
          src={essayImage} 
          alt="Algorithmic Division Illustration" 
          style={{
            width: '100%',
            maxWidth: imageConfig.width,
            height: 'auto',
            display: 'block'  // Prevents any unwanted spacing
          }}
        />
      </div>


      <p>
        Ad-driven business models have cornered social media companies into implementing algorithms that recommend engaging content. 
      </p>

      <p>
      Turns out the most engaging content often triggers our strongest emotional reactions: anger, fear and disgust directed at others. Let's call these unregulated algorithms "AMDs" (Algorithms of Mass Division), and the content they promote, "stories".
      </p>


      <p>
        AMDs are killing capitalist, multi-cultural democracies by amplifying polarizing stories that deepen societal divides.
      </p>

      <p>
        Imagine walking to your local bookstore (if you still do that) and asking the lady behind the counter to recommend you some books to keep you entertained for the weekend. A couple of minutes later the bookkeeper drops a stack of books on the counter — "these books should do the trick — they will confirm all your fears and dislikes about other groups of people. Instead of exploring new ideas, these books will harden and exaggerate your existing biases. Have a great day, and oh! Don't forget to vote!"
      </p>

      <p>
        AMDs function like this hypothetical librarian, feeding us a steady diet of stories that strengthens our biases, highlighting are differences and exaggerating divisions. If authors knew librarians were promoting these kinds of books, a significant number might write books that ensure they are at the top of the reading stack — just like AMDs incentivize creators to create polarizing stories in the hopes they will be spread far and wide.
      </p>

      <p>
        At the heart of capitalist, multicultural democracies is the aspiration for different groups — defined by economic status, customs, religions, and values — to coexist peacefully. Achieving this harmony requires each of us to try to see the world through the eyes of others. It requires us to look beyond superficial differences and recognize commonalities, to promote stories that bring us together rather than pull us apart. Through the bad times, and the good.
      </p>

      <p>
        But AMDs divert us from moving towards this aspiration.
      </p>

      <p>
        Algorithms elevating divisive stories hold immense power to shape what stories we read and through them how we come to understand the world. These stories, presented as truth, tell us how we should understand and respond to people different than us. If the most widely circulated stories promote disgust and highlight differences while passing as factual, is it any wonder pluralistic societies are becoming increasingly polarized?
      </p>

      <p>
        AMDs don't have the power to create new divisions, they find and elevate existing stories, and use those as the leverage to widen the chasm of difference between us.
      </p>

      <p>
        Yes, it is true — as individuals we have the agency to choose what stories we read. We can curate our own information diets. And regulators could theoretically legislate against harmful AMDs. But we are still waiting for this legislation, and public awareness of the negative impacts of these algorithms remains limited, rarely taught or discussed in our early education. Children are often permitted to use TikTok with little or no supervision and with no preparation or defenses are exposed to these dangers at a very early age.
      </p>

      <p>
        So, in absence of education and regulation, what remains?
      </p>

      <p>
        More compelling alternatives.
      </p>

      <p>
        Generative AI will blow up the design space for news feeds where these stories are published, freeing us to reimagine experiences that connect people rather than divide them. Imagine news feeds that emphasize "first-person narratives," allowing users to see the perspectives of people from other echo chambers. Or interest-based matching systems that connect users with diverse perspectives on shared passions. What if bias and sentiment scores could appear in tooltips, helping users navigate stories with greater awareness?
      </p>

      <p>
        And the good news is, we don't have to reinvent the wheel. We can draw from fields where the ability to have honest conversations that foster understanding and growth are a prerequisite for success — elite sport teams and successful start-ups. If we know these conversations can be held between humans, and lead to some of the most high-performing organizations in the world, let's find a way to scale to the rest of the world through communication technology.
      </p>

      <p>
        We can envision a future where social media platforms are designed from the ground up with these principles in mind. If news feeds and recommendation algorithms continue to be central to social media, can we develop systems that encourage understanding and growth rather than alienation?
      </p>

      <p>
        The goal is to create engagement-based platforms that leverage Algorithms of Mass Connection (AMCs) rather than AMDs — platforms that foster connection, understanding, while still generating profit.
      </p>
    </EssayTemplate>
  );
};

export default AlgorithmsOfMassConnection;