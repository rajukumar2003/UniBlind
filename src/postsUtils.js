import { getFirestore, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';

export const fetchPosts = async () => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy("createdAt", "desc")); // Order posts by creation date (descending)

    try {
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;  
    }
}
