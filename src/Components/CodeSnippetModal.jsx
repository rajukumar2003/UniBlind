const CodeSnippetModal = ({ onClose, codeSnippetText, onCodeChange, onCodeSubmit }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-white">
            <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-6 relative">
                <button onClick={onClose} className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-xl font-semibold mb-4">Code Snippet</h2>
                <label htmlFor="codeSnippet"></label>
                <textarea
                    id="codeSnippet"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    value={codeSnippetText}
                    onChange={(e) => onCodeChange(e.target.value)}
                    placeholder="Type your code snippet here..."
                ></textarea>
                <button onClick={onCodeSubmit} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Send
                </button>
            </div>
        </div>
    );
};

export default CodeSnippetModal;
