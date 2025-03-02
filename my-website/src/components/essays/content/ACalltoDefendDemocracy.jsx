// src/components/essays/content/DemocracyEssay.jsx
import React from 'react';
import EssayTemplate from '../EssayTemplate';  // Go up one level since they're in the same folder
import essayImage from '../../../assets/a_call_to_defend_democracy.png'; // Using the same image path for now

// Image configuration object - easily adjust dimensions here
const imageConfig = {
  width: '600px',     // Maximum width of the image
  spacing: {
    top: '48px',      // Space between author and image
    bottom: '48px'    // Space between image and text
  }
};

const ACalltoDefendDemocracy = () => {
  return (
    <EssayTemplate
      title="A Call to Defend Democracy"
      author="ALEXANDER WOLFGANG HUMPERT"
      date="February 21, 2025"
    >
      <div style={{ 
        marginTop: imageConfig.spacing.top, 
        marginBottom: imageConfig.spacing.bottom 
      }}>
        <img 
          src={essayImage} 
          alt="Democracy Illustration" 
          style={{
            width: '100%',
            maxWidth: imageConfig.width,
            height: 'auto',
            display: 'block'  // Prevents any unwanted spacing
          }}
        />
      </div>

      <p>
        My brethren,
        Our gathering today is not one of joy and celebration, but of concern and fear for our fair lady—Democracy.
      </p>

      <p>
        For nearly a century, her light has shone brightly over the vast lands of the Americas. Like a lighthouse piercing the darkness, she has stood as a beacon of hope, guiding the brave forward. She has been the assurance of wayward souls, offering purpose to those willing to risk everything for the promise of a life justified by freedom.
      </p>

      <p>
        Her steady glow has drawn to her shores those who sought refuge from the icy grip of despotism and despair. Brothers and sisters from distant lands have crossed perilous expanses, driven by the hope of planting the fragile seeds of their forefathers' legacies in fertile soil. They came believing that, nourished by the winds of liberty and warmed by the sun of equality, these seeds would bloom—contributing to the flourishing garden of all who call this land home.
      </p>

      <p>
        Yet, I fear that Lady Democracy's light no longer shines as it once did. With each passing moment, her brilliance fades. The very ground she watches over now births vines that seek to choke the life from her.
      </p>

      <p>
        Who among us will rise to her defense? Who will take up the blade to sever these strangling vines and cast them into the furnaces of justice?
      </p>

      <p>
        Perhaps we do not always think of Lady Democracy, but I assure you—she has never ceased to think of us.
      </p>

      <p>
        Like sunlight upon the skin, her presence is often unnoticed until it is gone. Only in darkness do we realize the warmth we have lost.
      </p>

      <p>
        We, the sons and daughters of Democracy—who have long nourished ourselves at her breast—must now answer her call. Not only out of nobility or courage but out of fear for what our legacy will become should it be caged once more in the frozen prison of despair.
      </p>

      <p>
        Let us embark on this journey—not merely as wanderers in search of a lost ideal, but as stewards of a sacred trust. Let us renew our vows to safeguard Democracy, to rekindle the flame that has guided so many before us.
      </p>

      <p>
        For what is a promise if not upheld? What is a legacy if left to wither? We must not stand idly by as the light that has illuminated our path is dimmed by complacency, nor allow the vines of tyranny to take root in the soil of our freedom.
      </p>

      <p>
        Let this be our charge: to speak where silence is demanded, to act where inaction is expected, and to defend where surrender is assumed. Let us, with unwavering resolve, ensure that Democracy's light does not flicker into oblivion but blazes anew—a fire that no storm can quench, a beacon that no darkness can eclipse.
      </p>

      <p>
        And when future generations look upon this moment, let them not say that we were the ones who watched her fade, but that we were the ones who stood, fought, and rekindled the promise of Democracy for all who would come after us.
      </p>
    </EssayTemplate>
  );
};

export default ACalltoDefendDemocracy;