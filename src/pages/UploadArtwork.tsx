import { useState } from 'react';
import { Upload, CheckCircle, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ArtworkFormData {
    artistName: string;
    email: string;
    phone: string;
    title: string;
    medium: string;
    dimensions: string;
    price: string;
    description: string;
    image: File | null;
}

export default function UploadArtwork() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ArtworkFormData>({
        artistName: '',
        email: '',
        phone: '',
        title: '',
        medium: '',
        dimensions: '',
        price: '',
        description: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const mediumOptions = [
        'Oil on Canvas',
        'Acrylic on Canvas',
        'Watercolor',
        'Digital Art',
        'Mixed Media',
        'Charcoal',
        'Ink',
        'Pencil',
        'Gouache',
        'Other',
    ];

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // Required fields
        if (!formData.title || formData.title.length < 3) {
            newErrors.title = 'Title must be at least 3 characters';
        }
        if (!formData.price || parseFloat(formData.price) <= 0) {
            newErrors.price = 'Please enter a valid price';
        }
        if (!formData.image) {
            newErrors.image = 'Please upload an image of your artwork';
        }

        // Optional but validated if provided
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageChange = (file: File | null) => {
        if (!file) return;

        // Validate file type
        if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
            setErrors({ ...errors, image: 'Please upload a JPEG or PNG image' });
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setErrors({ ...errors, image: 'Image size must be less than 5MB' });
            return;
        }

        setFormData({ ...formData, image: file });
        setErrors({ ...errors, image: '' });

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleImageChange(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Store in localStorage (demo version)
        const submissions = JSON.parse(localStorage.getItem('artworkSubmissions') || '[]');
        const newSubmission = {
            id: Date.now().toString(),
            ...formData,
            image: imagePreview,
            status: 'Pending Review',
            submittedAt: new Date().toISOString(),
        };
        submissions.push(newSubmission);
        localStorage.setItem('artworkSubmissions', JSON.stringify(submissions));

        // Show success modal
        setShowSuccess(true);
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        // Reset form
        setFormData({
            artistName: '',
            email: '',
            phone: '',
            title: '',
            medium: '',
            dimensions: '',
            price: '',
            description: '',
            image: null,
        });
        setImagePreview('');
        setErrors({});
        // Navigate to home
        setTimeout(() => navigate('/'), 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-24 pb-16">
            <div className="container-art">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="mb-8 inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium border border-border px-4 py-2 rounded-full bg-background/50 hover:bg-background"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </button>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Sell Your Art
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Share your masterpiece with art lovers across India. Fill in the details below and we'll review your artwork within 24-48 hours.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Form Fields */}
                        <div className="space-y-6">
                            {/* Artist Information */}
                            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                                <h2 className="font-heading text-2xl font-semibold mb-4">Artist Information</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Full Name <span className="text-muted-foreground"></span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.artistName}
                                            onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Email <span className="text-muted-foreground"></span>
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-border'
                                                } bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                                            placeholder="artist@example.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Phone <span className="text-muted-foreground"></span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-border'
                                                } bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                                            placeholder="9876543210"
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Artwork Details */}
                            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                                <h2 className="font-heading text-2xl font-semibold mb-4">Artwork Details</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Title <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.title ? 'border-red-500' : 'border-border'
                                                } bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                                            placeholder="e.g., Sunset Over Mumbai"
                                            required
                                        />
                                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Medium</label>
                                        <select
                                            value={formData.medium}
                                            onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        >
                                            <option value="">Select medium...</option>
                                            {mediumOptions.map((medium) => (
                                                <option key={medium} value={medium}>
                                                    {medium}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Dimensions</label>
                                        <input
                                            type="text"
                                            value={formData.dimensions}
                                            onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder='e.g., 24" x 36"'
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Price (₹) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.price ? 'border-red-500' : 'border-border'
                                                } bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                                            placeholder="10000"
                                            min="0"
                                            required
                                        />
                                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Description / Story
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                            rows={4}
                                            maxLength={500}
                                            placeholder="Tell us about your artwork, its inspiration, or the story behind it..."
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {formData.description.length}/500 characters
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Image Upload */}
                        <div className="space-y-6">
                            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border sticky top-24">
                                <h2 className="font-heading text-2xl font-semibold mb-4">
                                    Upload Image <span className="text-red-500">*</span>
                                </h2>

                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`relative border-2 border-dashed rounded-xl transition-all ${isDragging
                                        ? 'border-primary bg-primary/5'
                                        : errors.image
                                            ? 'border-red-500'
                                            : 'border-border'
                                        } ${imagePreview ? 'p-2' : 'p-8'}`}
                                >
                                    {imagePreview ? (
                                        <div className="relative group">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-auto rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview('');
                                                    setFormData({ ...formData, image: null });
                                                }}
                                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                            <p className="text-lg font-medium mb-2">
                                                Drag & drop your artwork here
                                            </p>
                                            <p className="text-sm text-muted-foreground mb-4">or</p>
                                            <label className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors">
                                                Browse Files
                                                <input
                                                    type="file"
                                                    accept="image/jpeg,image/jpg,image/png"
                                                    onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                                                    className="hidden"
                                                />
                                            </label>
                                            <p className="text-xs text-muted-foreground mt-4">
                                                JPEG or PNG • Max 5MB • High resolution recommended
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {errors.image && <p className="text-red-500 text-sm mt-2">{errors.image}</p>}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg font-semibold text-lg hover:shadow-lg hover:scale-[1.02] transition-all"
                                >
                                    Submit for Review
                                </button>

                                <p className="text-xs text-muted-foreground text-center mt-4">
                                    By submitting, you agree to our terms and conditions
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-card rounded-2xl p-8 max-w-md w-full shadow-2xl border border-border animate-scale-in">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="font-heading text-2xl font-bold mb-2">
                                Submission Successful!
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                Thank you! Your artwork has been submitted for quality review. It will be live on our platform within 24-48 hours.
                            </p>
                            <button
                                onClick={handleSuccessClose}
                                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                            >
                                Got it!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
