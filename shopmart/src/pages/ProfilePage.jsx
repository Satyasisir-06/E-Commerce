import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, Mail, Phone, MapPin, Edit, Save, X } from 'lucide-react';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { setUser } from '../store/slices/authSlice';
import Button from '../components/ui/Button';

export default function ProfilePage() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        displayName: user?.displayName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
    });

    const handleSave = async () => {
        try {
            setLoading(true);

            // Update Firebase Auth profile
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: formData.displayName,
                });

                // Update Firestore user document
                const userRef = doc(db, 'users', user.uid);
                await updateDoc(userRef, {
                    displayName: formData.displayName,
                    phone: formData.phone,
                    address: formData.address,
                });

                // Update Redux state
                dispatch(setUser({
                    ...user,
                    displayName: formData.displayName,
                    phone: formData.phone,
                    address: formData.address,
                }));

                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            displayName: user?.displayName || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || '',
        });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                        My Profile
                    </h1>
                    <p className="text-muted">Manage your account information</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header with Avatar */}
                    <div className="bg-gradient-to-r from-primary to-secondary p-8">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-3xl font-bold text-primary">
                                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-heading font-bold text-white mb-1">
                                    {user?.displayName || 'User'}
                                </h2>
                                <p className="text-white/90">{user?.email}</p>
                                <div className="mt-3">
                                    <span className="inline-flex px-3 py-1 bg-white/20 text-white rounded-lg text-sm font-medium capitalize">
                                        {user?.role || 'Buyer'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-heading font-bold text-foreground">
                                Personal Information
                            </h3>
                            {!isEditing ? (
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit Profile
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button
                                        variant="primary"
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        {loading ? 'Saving...' : 'Save'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleCancel}
                                        disabled={loading}
                                        className="flex items-center gap-2"
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-muted mb-2">
                                    <User className="w-4 h-4" />
                                    Full Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.displayName}
                                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="John Doe"
                                    />
                                ) : (
                                    <p className="text-foreground font-medium px-4 py-3 bg-gray-50 rounded-xl">
                                        {user?.displayName || 'Not set'}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-muted mb-2">
                                    <Mail className="w-4 h-4" />
                                    Email Address
                                </label>
                                <p className="text-foreground font-medium px-4 py-3 bg-gray-50 rounded-xl">
                                    {user?.email}
                                    <span className="text-xs text-muted ml-2">(Cannot be changed)</span>
                                </p>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-muted mb-2">
                                    <Phone className="w-4 h-4" />
                                    Phone Number
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="9876543210"
                                    />
                                ) : (
                                    <p className="text-foreground font-medium px-4 py-3 bg-gray-50 rounded-xl">
                                        {user?.phone || 'Not set'}
                                    </p>
                                )}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-muted mb-2">
                                    <MapPin className="w-4 h-4" />
                                    Address
                                </label>
                                {isEditing ? (
                                    <textarea
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                        rows="3"
                                        placeholder="Enter your address"
                                    />
                                ) : (
                                    <p className="text-foreground font-medium px-4 py-3 bg-gray-50 rounded-xl min-h-[88px]">
                                        {user?.address || 'Not set'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Settings */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
                    <h3 className="text-lg font-heading font-bold text-foreground mb-4">
                        Account Settings
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-medium text-foreground">Account Status</p>
                                <p className="text-sm text-muted">Your account is active</p>
                            </div>
                            <span className="inline-flex px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                                Active
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-medium text-foreground">Member Since</p>
                                <p className="text-sm text-muted">
                                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    }) : 'Recently joined'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
