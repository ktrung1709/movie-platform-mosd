import { Input, Uploader } from "../../../Components/Utils/Inputs.jsx";
import SideBar from "../SideBar/SideBar.jsx";

function Profile() {
    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Profile</h2>
                <Uploader />
                <Input
                    label="FullName"
                    placeholder="Your name"
                    type="text"
                    bg={true}
                />
                <Input
                    label="Email"
                    placeholder="Your email"
                    type="email"
                    bg={true}
                />
                <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
                    <button className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
                        Delete Account
                    </button>
                    <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
                        Update Profile
                    </button>
                </div>
            </div>
        </SideBar>
    );
}

export default Profile;