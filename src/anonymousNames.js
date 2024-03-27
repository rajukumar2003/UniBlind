const adjectives = ["Anonymous", "Curious", "Thoughtful", "Clever", "Bold", "Brave", "Creative", "Daring", "Eager", "Fearless", "Gentle", "Honest", "Inventive", "Jolly", "Kind", "Lively", "Mighty", "Noble", "Optimistic", "Proud", "Quiet", "Reliable", "Silly", "Talented", "Unique", "Valiant", "Wise", "Xenial", "Youthful", "Zealous"];
const nouns = ["Student", "Panda", "Scholar", "Thinker", "Explorer", "Pioneer", "Adventurer", "Dreamer", "Innovator", "Leader", "Hero", "Champion", "Survivor", "Warrior", "Pirate", "Ninja", "Viking", "Knight", "Wizard", "Sorcerer", "Magician", "Alchemist", "Engineer", "Scientist", "Artist", "Poet", "Writer", "Singer", "Dancer", "Athlete", "Gamer", "Coder", "Hacker", "Programmer", "Developer", "Designer", "Architect", "Builder", "Maker", "Creator", "Inventor", "Entrepreneur", "Philosopher", "Mentor", "Teacher", "Professor", "Scholar", "Researcher", "Scientist", "Engineer", "Doctor", "Nurse", "Therapist", "Psych"];

export function generateRandomUsername() {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective}${randomNoun}`;
}

