
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useBucketStore } from "../../store/useBucketStore";
import { toast } from "react-toastify";

const CreateBucketModal = ({ onClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false); // default value
    const { createBucket } = useBucketStore();

    const handleSubmit =async(e) => {
        e.preventDefault();
        
        const body = {
            name: title,
            description: description,
            isPublic: isPublic === "true" ? true : false ,
        }

        const res = await createBucket(body);
        if(res.success){
            setTitle("");
            setDescription("");
            setIsPublic(false);
            onClose();
            toast.success(res.message);
        }else{
            toast.error(res.message);
        }
        console.log("res ====> ", res);
        

    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
                className="bg-white rounded-xl w-full max-w-md"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Create New Bucket</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
                            <select
                                value={isPublic}
                                onChange={(e) => setIsPublic(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
                            >
                                <option value={true}>🌍 Public</option>
                                <option value={false}>🔒 Private</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default CreateBucketModal;
