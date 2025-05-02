// src/components/essays/content/post_platform_social_internet.jsx
import React from 'react';
import EssayTemplate from '../EssayTemplate';  // Go up one level since they're in the same folder
import essayImage from '../../../assets/post_platform_pic.png'; // Update this path

// Image configuration object - easily adjust dimensions here
const imageConfig = {
  width: '600px',     // Maximum width of the image
  spacing: {
    top: '48px',      // Space between author and image
    bottom: '48px'    // Space between image and text
  }
};


const PostPlatformSocialInternet = () => {
  return (
    <EssayTemplate
      title="Toward a Post-Platform Social Internet"
      author="ALEXANDER WOLFGANG HUMPERT"
      date="May 3, 2025"
    >
      <div style={{ 
        marginTop: imageConfig.spacing.top, 
        marginBottom: imageConfig.spacing.bottom 
      }}>
        <img 
          src={essayImage} 
          alt="Post-Platform Social Internet Illustration" 
          style={{
            width: '100%',
            maxWidth: imageConfig.width,
            height: 'auto',
            display: 'block'  // Prevents any unwanted spacing
          }}
        />
      </div>

      <h2>Preface</h2>

      <p>
        A handful of social media platforms shape how we understand the world—and how communities relate to one another. They all rely on some variant of an engagement-based algorithm to determine what we see, who we hear from, and which issues rise to the surface.
      </p>

      <p>
      This is a problem.
      </p>

      <p>
        These algorithms are not designed to serve the public good. They exist to maximize ad revenue—driving up the value of attention, not the quality of discourse, wellbeing, or democracy.
      </p>

      <p>
        I've been searching for alternatives.
      </p>

      <p>
        Over the past month, I've gone deep into the world of the decentralized social web. I've watched every video, listened to every podcast, and read every blog post I could find to understand the vision, the architecture, and the people working to rebuild the internet around users—not platforms.
      </p>

      <p>
        What follows is a summary of what I've learned—an opinion piece for anyone who, like me, is trying to understand how we can reclaim technology as a force for strengthening our social fabric, not fracturing it. If we fail, we risk ceding even more ground to the illiberal forces already gaining power through the very systems designed to keep us distracted, divided, and disengaged.
      </p>

      <h2>Executive Summary</h2>

      <p>
        For two decades, digital social life has been dominated by platform monopolies—Facebook, TikTok, Twitter/X, and Snapchat—all of which operate on the same extractive model: optimize engagement to maximize ad revenue. This regime, reinforced by closed ecosystems and algorithmic opacity, has corrupted our information flows, undermined our mental health, and destabilized democratic governance. Despite minor variations in format or community focus, every "successful" social media company has adopted this same profit-maximizing blueprint.
      </p>

      <p>
        This paper argues that the way forward is not to build a better platform—but to abandon the platform model altogether. We must create a protocol-based social internet, where developers and users collaboratively shape their own digital environments, where social graphs are portable, and where attention economies can be restructured around human needs—not corporate profits.
      </p>

      <h2>The Problem: Platforms as Private Infrastructures of Public Life</h2>

      <p>
        Today's dominant social media platforms are not neutral services. They are privately owned infrastructures that shape how billions of people communicate, form identities, and participate in civic life. Their recommendation algorithms, tuned for short-term engagement, exploit psychological vulnerabilities to maximize screen time and ad revenue.
      </p>

      <p>
        This model results in:
      </p>
      <ul>
        <li>User exploitation: Addiction, anxiety, doomscrolling, FOMO, and worsening attention spans.</li>
        <li>Public harm: Misinformation, radicalization, surveillance capitalism, and election interference.</li>
        <li>Stagnant innovation: Closed APIs and walled gardens prevent meaningful third-party development.</li>
        <li>Structural monopoly: Network effects, data hoarding, and lock-in prevent users from exiting.</li>
      </ul>

      <p>
        No matter how many "new" platforms emerge, the structure remains the same.
      </p>

      <h2>The Illusion of Choice: Why "New" Platforms Haven't Changed the Game</h2>

      <p>
        Several alternative platforms—Mastodon, Bluesky, Ello, Diaspora—have emerged in recent years. While they offer improvements in moderation, user control, or decentralization, none have achieved critical mass. Why?
      </p>

      <ul>
        <li>Lack of portability: Users can't bring their social graphs or reputations across platforms.</li>
        <li>Fragmented experiences: Onboarding, UI/UX, and content discovery remain clunky.</li>
        <li>Economic gravity: Without ad revenue, most cannot scale or sustain.</li>
      </ul>

      <p>
        In short: they are still trying to be platforms. To truly exit the cycle, we need a new model entirely.
      </p>

      <h2>The Solution: A Protocol-Based Social Internet</h2>

      <p>
        A protocol is not a product. It's an open standard that anyone can build on—like email, the web, or TCP/IP. A social protocol would allow users, developers, communities, and businesses to interact over shared infrastructure without centralized control. Instead of a single social media company dictating your experience, you'd have:
      </p>
      <ul>
        <li>Portable social identity: Your username, connections, and content move with you.</li>
        <li>Composable features: Users choose their own feed algorithms, moderation layers, and UIs.</li>
        <li>Marketplace of experiences: Developers compete to provide services—news feeds, chat interfaces, creator tools—that plug into the same ecosystem.</li>
        <li>User sovereignty: Individuals and communities control their data, their rules, and their digital space.</li>
      </ul>

      <p>
        Think of it not as a new app, but as a social operating system.
      </p>

      <h2>Pitfalls to Watch Out For</h2>

      <p>
        This vision is ambitious—but it will only succeed if we avoid the common traps that have sunk prior reform efforts. Here are four key challenges:
      </p>

      <h3>1. Platform Dominance vs. Real Success</h3>

      <p>
        Mastodon, Bluesky, and others have not yet reached the scale of TikTok or Facebook. But scale isn't the only issue. Today, success in social media is defined by scale precisely because the ad-based model demands mass data and mass attention.
      </p>

      <p>
        If we move to a protocol-based internet, we must ask: What is our new metric of success?
        If it's thriving, self-governing communities, how do we measure and support them?
        And if scale still matters, how do we prevent monopolistic dynamics from reappearing—where one client dominates usage and becomes the new "Facebook of the protocol"?
      </p>

      <p>
        Even Bluesky, with all its decentralization rhetoric, is at risk of recentralizing around a single dominant app experience. Without intentional checks, the protocol model can simply reproduce the power structures it seeks to escape.
      </p>

      <h3>2. Protocols Alone Won't Save Us</h3>

      <p>
        Protocols shift the locus of control—but they are not silver bullets. We've had open, federated systems before: email, RSS, XMPP. Most users eventually abandoned them in favor of sleek, centralized alternatives. Why?
      </p>
      <ul>
        <li>Better UX</li>
        <li>Network effects</li>
        <li>Brand trust</li>
        <li>Seamless onboarding</li>
      </ul>

      <p>
        Protocols often lose not because they're wrong—but because they're harder to love. If we want a protocol-based internet to thrive, we must compete on usability, delight, and trust, not just principle. Ethical tech that's clunky still loses to unethical tech that's seamless.
      </p>

      <h3>3. You're Betting on Users Making Good Choices</h3>

      <p>
        Giving users the power to choose their moderation systems, feed algorithms, and content filters is a noble ideal. But do most people want that power?
      </p>

      <p>
        This idea assumes a level of digital literacy, civic engagement, and time investment that most users—busy, distracted, overwhelmed—don't have. In practice, we'll likely see a power law distribution: a small minority of power users fine-tune their experience; the majority will accept whatever defaults are most convenient.
      </p>

      <p>
        To prevent open protocols from devolving into lowest-common-denominator ecosystems, we need:
      </p>
      <ul>
        <li>Great default clients</li>
        <li>Curated experiences that are ethical by design</li>
        <li>Social incentives for customization and community governance</li>
      </ul>

      <p>
        Otherwise, openness just becomes another layer of complexity most users avoid.
      </p>

      <h3>4. Pro-social Content Can Be Boring</h3>

      <p>
        If we want a better internet, we need better content. But here's the uncomfortable truth: conflict, novelty, identity performance, and fear are emotionally sticky. These are the forces that drive virality—not kindness or civic virtue.
      </p>

      <p>
        So how do we empower creators to build pro-social content that actually thrives?
      </p>

      <p>
        We need:
      </p>
      <ul>
        <li>New formats that are emotionally rich but not manipulative</li>
        <li>Algorithms that optimize for long-term satisfaction rather than short-term hits</li>
        <li>Revenue models that reward creators for value, not just virality</li>
      </ul>

      <p>
        Without these, creators will continue to chase engagement—even in a decentralized world.
      </p>

      <h2>Addressing Common Critiques</h2>

      <p>
        1. "People don't want to configure everything."<br />
        True—most won't. That's why default clients must offer excellent UX. But the difference is choice: power users, developers, and communities can modify and fork. That optionality is what breaks monopolies.
      </p>

      <p>
        2. "Open systems are vulnerable to abuse."<br />
        Also true—but not insurmountable. With robust moderation protocols, verified namespaces, and reputational models, safety can be built into the protocol layer. The goal isn't perfect openness, but structured modularity.
      </p>

      <p>
        3. "Decentralized systems don't scale."<br />
        That's a technical and design challenge—not a dead end. Bluesky's AT Protocol, for example, shows how federated identity and composable features can offer scalable infrastructure while maintaining user freedom.
      </p>

      <h2>A Three-Pronged Strategy for Change</h2>

      <p>
        1. Build the Protocol Layer
      </p>
      <ul>
        <li>Contribute to or fork efforts like AT Protocol, ActivityPub, or new architectures.</li>
        <li>Define core schemas: identity, follows, blocks, moderation, feeds.</li>
        <li>Fund developer marketplaces for social media feature modules, giving choice back to users.</li>
      </ul>

      <p>
        2. Regulate the Existing Platforms
      </p>
      <ul>
        <li>Mandate social graph portability and API access under antitrust law.</li>
        <li>Require algorithmic transparency and user customization.</li>
        <li>Tax excessive attention harvesting and data extraction to disincentivize dark patterns.</li>
      </ul>

      <p>
        3. Empower Pro-Social Creators
      </p>
      <ul>
        <li>Create funding models for creators who prioritize meaning over virality.</li>
        <li>Offer incentives for non-engagement-based metrics (well-being, knowledge, civic participation).</li>
        <li>Build tools that enable healthy defaults for communities.</li>
      </ul>

      <h2>Conclusion: From Digital Enclosure to Digital Commons</h2>

      <p>
        The 2010s were the age of digital enclosure. Closed platforms monopolized public life, extracted attention, and repackaged our identities for sale. The 2020s can be the decade we reverse that trend.
      </p>

      <p>
        A protocol-based social internet isn't just a technical upgrade. It's a political and cultural shift—toward user agency, democratic governance of digital space, and public-interest infrastructure. It won't be easy. But if we care about the future of communication, connection, and democracy, it's time to build for exit.
      </p>
      <h2>Sources</h2>
      <p>
        Some sources that I found invaluable:
      </p>
      
      <ul className="sources-list" style={{ marginTop: '2rem' }}>
        <li><a href="https://www.youtube.com/watch?v=B7OwcXCE5Rg&list=PLEGjpl2KYaNi-ZbskZDPNFTXBG83utc9U&index=41&ab_channel=SXSW" target="_blank" rel="noopener noreferrer">SXSW Panel: Rebuilding Social Media</a></li>
        <li><a href="https://www.youtube.com/watch?v=s5t427SRkvk&list=PLEGjpl2KYaNi-ZbskZDPNFTXBG83utc9U&index=39&ab_channel=Flipboard" target="_blank" rel="noopener noreferrer">Flipboard: The Future of Digital Public Spaces</a></li>
        <li><a href="https://www.youtube.com/watch?v=PSPuqYbnq-A&list=PLEGjpl2KYaNi-ZbskZDPNFTXBG83utc9U&index=28&ab_channel=GlobalSpeakersBureau" target="_blank" rel="noopener noreferrer">Global Speakers Bureau: Protocol-Based Social Networks</a></li>
        <li><a href="https://www.youtube.com/watch?v=5gcVoAJWtoE&list=PLEGjpl2KYaNhAJinXxWz8NxaCVhYMWuRn&ab_channel=Flipboard" target="_blank" rel="noopener noreferrer">Flipboard: Decentralized Social Web Summit</a></li>
        <li><a href="https://www.youtube.com/watch?v=-R9CWq5CBlk&t=4010s&ab_channel=WVFRMPodcast" target="_blank" rel="noopener noreferrer">WVFRM Podcast: The Protocol Revolution</a></li>
        <li><a href="https://www.techdirt.com/2025/04/17/the-de-in-decentralization-stands-for-democracy/" target="_blank" rel="noopener noreferrer">Techdirt: The 'De' in Decentralization Stands for Democracy</a></li>
        <li><a href="https://aliceyuanzhang.com/decentralization" target="_blank" rel="noopener noreferrer">Alice Yuan Zhang: Decentralization</a></li>
        <li><a href="https://knightcolumbia.org/content/protocols-not-platforms-a-technological-approach-to-free-speech" target="_blank" rel="noopener noreferrer">Knight Columbia: Protocols Not Platforms: A Technological Approach to Free Speech</a></li>
        <li><a href="https://ffdweb.org/digest/terminal-values-cognitive-liberty" target="_blank" rel="noopener noreferrer">FFD Web: Terminal Values &amp; Cognitive Liberty</a></li>
        <li><a href="https://ffdweb.org/digest/decentralization-in-all-the-things" target="_blank" rel="noopener noreferrer">FFD Web: Decentralization in All the Things</a></li>
        <li><a href="https://ffdweb.org/digest/reviving-internet-decentralization-without-relying-on-the-b-word" target="_blank" rel="noopener noreferrer">FFD Web: Reviving Internet Decentralization Without Relying on the B-Word</a></li>
        <li><a href="https://kgi.georgetown.edu/research-and-commentary/better-feeds/" target="_blank" rel="noopener noreferrer">Georgetown KGI: Better Feeds</a></li>
        <li><a href="https://bsky.social/about/blog/3-6-2022-a-self-authenticating-social-protocol" target="_blank" rel="noopener noreferrer">A Self-Authenticating Social Protocol</a></li>
        <li><a href="https://gitlab.com/bluesky-community1/decentralized-ecosystem/-/blob/master/README.md" target="_blank" rel="noopener noreferrer">Ecosystem Overview</a></li>
      </ul>

    </EssayTemplate>
  );
};

export default PostPlatformSocialInternet;