import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Addpost, GoogleIcon, GroupChat, Logo, Proom, Vidchat } from "../assets/Icons";
import { events } from "../Constans";
import PostCard from "../Components/PostCard";
import { useState, useEffect } from "react";
import { fetchPosts } from "../postsUtils";
import { getFirestore, collection, getDoc, doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { useUserContext } from "../userContext";
import { db } from "../firebase";
import Dashfirst from "../Components/Dashfirst";
import Dashthird from "../Components/Dashthird";

const Dashboard = () => {
	const { userId } = useUserContext();
	const [username, setUsername] = useState("");
	const [posts, setPosts] = useState([]);
	const [upvote, setUpvote] = useState(0);
	const [hasUpvoted, setHasUpvoted] = useState("");
	const [isPostFormOpen, setIsPostFormOpen] = useState(false);

	const navigate = useNavigate();

	// Fetching Posts-------------------------------------------------------------------
	useEffect(() => {
		const getPosts = async () => {
			try {
				const fetchedPosts = await fetchPosts();
				setPosts(fetchedPosts);
				// setUsername
				const username = await fetchUsername(userId);
				setUsername(username);
			} catch (error) {
				console.log(error);
			}
		};
		getPosts();
	}, []);

	// Real-time Firestore Listener
	useEffect(() => {
		const postsRef = collection(db, "posts");

		const unsubscribe = onSnapshot(postsRef, (querySnapshot) => {
			const updatedPosts = querySnapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id
			}));
			
			updatedPosts.sort((a, b) => {
				return b.createdAt - a.createdAt;
			})				
			
			// Sort by upvotes (descending) and then by timestamp (descending)
			// updatedPosts.sort((a, b) => {
			// 	if (b.upvotes.length !== a.upvotes.length) {
			// 		return b.upvotes.length - a.upvotes.length;  // Sort by upvotes primarily
			// 	} else {
			// 		// Upvotes are equal, sort by timestamp (newest first)
			// 		return b.createdAt.toDate() - a.createdAt.toDate();
			// 	}
			// });

			setPosts(updatedPosts);
		});

		return () => unsubscribe();
	}, []);


	// Fetching Username-------------------------------------------------------------------
	async function fetchUsername(userId) {
		const db = getFirestore();
		const userDocRef = doc(db, "users", userId);
		const userDocSnap = await getDoc(userDocRef);

		if (userDocSnap.exists()) {
			return userDocSnap.data().username;
		} else {
			return null;
		}
	}

	// Handle Post Upvote-------------------------------------------------------------------
	const handlePostUpvote = async (postId) => {
		try {
			// 1. Update Firestore
			const postRef = doc(db, "posts", postId);
			await updateDoc(
				postRef,
				{
					upvotes: arrayUnion(userId),
				},
				{
					arrayContains: userId, // Prevents duplicate upvotes
				}
			);

			// 2. Update Local State (Optimistic Update)
			const updatedPosts = posts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						upvotes: post.upvotes.concat(userId),
						hasUpvoted: true,
					}; // Adding user ID to upvotes
				} else {
					return post;
				}
			});
			setPosts(updatedPosts);
			setHasUpvoted(true);
		} catch (error) {
			console.error("Error upvoting post:", error);
		}
	};


	return (
		<main>
			<nav className="bg-[#B4D4FF] top-0 w-full h-100 flex z-10 fixed">
				<img src={Logo} alt="UniBLind Logo" className=" h-[55px] w-auto" />
				<p className="text-white m-auto font-semibold text-2xl font-montserrat">
					UniBlind
				</p>
			</nav>
			<div className="flex flex-row">

				{/* Section 1 ..................... */}
				<section className="h-screen bg-[#86B6F6] w-1/5 fixed">
					<Dashfirst username={username} isPostFormOpen={isPostFormOpen} setIsPostFormOpen={setIsPostFormOpen} />
				</section>

				{/* Section 2............................ */}
				<section className=" w-3/5 mx-auto ">
					<div className="mx-10">
						<p className=" mt-20 text-[#86B6F6] font-semibold mb-5 text-2xl font-montserrat">
							TRENDING
						</p>

						<div className=" flex flex-col">
							{posts.map((post, index) => (
								<PostCard
									key={index}
									imgURL={post.imagePath}
									title={post.title}
									message={post.description}
									username={post.username}
									upvote={post.upvotes}
									postId={post.id}
									postOwnerUserId={post.userId}
									hasUpvoted={post.upvotes.includes(userId)} // Initialize hasUpvoted state
									handleUpvote={() => handlePostUpvote(post.id)}
								/>
							))}
						</div>
					</div>
				</section>

				{/* Section 3........................ */}
				<section className="flex-1 bg-[#86B6F6] w-1/5 h-screen fixed right-0">
					<Dashthird />
				</section>
			</div>
		</main>
	);
};

export default Dashboard;
