'use client';

import { useState } from 'react';

const ImageGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/ai/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: prompt }),
            });

            const data = await response.json();

            if (response.ok) {
                setImageUrl(data.imageUrl);
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to fetch image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2 className="text-xl font-semibold mb-4 text-white">Image Generator</h2>
            <p>Enter a prompt to generate an image</p>
            <br></br>
            <div className="mx-auto p-4 bg-[#111111] rounded-lg shadow-md">
                {/* <div className='min-h-[60vh]'>
                {imageUrl && (
                    <div className="mt-4">
                        <img src={imageUrl} alt="Generated" className="w-full h-auto rounded" />
                    </div>
                )}
                </div> */}
                <div className='min-h-[60vh]'>
                    {imageUrl && (
                        <div className="mt-4">
                            <img
                                src={imageUrl}
                                alt="Generated"
                                className="w-full h-auto max-w-[40rem] object-cover rounded" // Adjust as needed
                            />
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='flex space-x-4'>
                        <input
                            type="text"
                            placeholder="Enter your prompt..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            required
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFBE1A] focus:border-transparent"
                        />
                        <br></br>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-[#FFBE1A] text-[#111111] font-semibold px-4 py-2 rounded-lg hover:bg-[#FFBE1A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${loading ? 'bg-gray-400' : 'bg-[#FFBE1A] hover:bg-[#FFBE1A]/90'}`}
                        >
                            {loading ? 'Generating...' : 'Generate Image'}
                        </button>
                    </div>
                </form>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </div>
        </>
    );
};

export default ImageGenerator;