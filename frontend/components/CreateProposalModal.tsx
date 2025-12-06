'use client';

export function CreateProposalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-lg border border-slate-700">
                <h2 className="text-2xl font-bold mb-6">Create Proposal</h2>
                <div className="space-y-4">
                    <input type="text" placeholder="Proposal Title" className="w-full bg-slate-800 p-3 rounded-lg border border-slate-700 outline-none focus:border-indigo-500" />
                    <textarea placeholder="Description" rows={4} className="w-full bg-slate-800 p-3 rounded-lg border border-slate-700 outline-none focus:border-indigo-500" />
                    <div className="flex gap-4 pt-4">
                        <button onClick={onClose} className="flex-1 py-2 bg-slate-800 rounded-lg hover:bg-slate-700">Cancel</button>
                        <button className="flex-1 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
