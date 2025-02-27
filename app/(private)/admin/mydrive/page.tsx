import { Upload } from 'lucide-react';
import React from 'react';

const DrivePage = () => {
    return <div className="p-2">
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white m-3"><Upload size={16} />Upload</button>
        <div className="recent-files">
            <h4 className="m-4">Recent Files</h4>
        </div>
    </div>;
};

export default DrivePage;