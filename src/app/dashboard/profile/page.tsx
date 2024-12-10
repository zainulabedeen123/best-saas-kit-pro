'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

interface Profile {
  id: string
  full_name?: string
  username?: string
  website?: string
  bio?: string
  avatar_url?: string | null
}

export default function ProfileSettings() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error
      setProfile(data || { id: user.id })
    } catch (error) {
      console.error('Error fetching profile:', error)
      setError('Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!profile?.id) return

    setIsSaving(true)
    setError(null)
    setSuccessMessage(null)

    try {
      // Validate username length
      if (profile.username && profile.username.length < 3) {
        throw new Error('Username must be at least 3 characters long')
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          ...profile,
          updated_at: new Date().toISOString(),
        })

      if (error) {
        if (error.code === '23505') {
          throw new Error('Username is already taken')
        }
        throw error
      }

      setSuccessMessage('Profile updated successfully')
      router.refresh() // Refresh the page to update any displayed profile data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleAvatarUpload(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setError(null)
      const file = event.target.files?.[0]
      if (!file) return

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file')
        return
      }

      // Validate file size (5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        setError('Image size must be less than 5MB')
        return
      }

      setIsSaving(true)

      // Create a unique file name
      const fileExt = file.name.split('.').pop()
      const userId = profile?.id
      const fileName = `${userId}/${Date.now()}.${fileExt}`

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', profile?.id)

      if (updateError) throw updateError

      setProfile(profile ? { ...profile, avatar_url: publicUrl } : null)
      setSuccessMessage('Avatar updated successfully')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload avatar')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleAvatarRemove() {
    if (!profile?.avatar_url) return

    try {
      setIsSaving(true)
      setError(null)

      // Extract file name from URL
      const fileName = profile.avatar_url.split('/').pop()
      if (fileName) {
        // Remove file from storage
        const { error: deleteError } = await supabase.storage
          .from('avatars')
          .remove([fileName])

        if (deleteError) throw deleteError
      }

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('id', profile.id)

      if (updateError) throw updateError

      setProfile(profile ? { ...profile, avatar_url: null } : null)
      setSuccessMessage('Avatar removed successfully')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove avatar')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
        <p className="mt-2 text-white/60">
          Manage your profile information and settings.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-green-500">{successMessage}</p>
        </div>
      )}

      <div className="bg-[#111111] rounded-2xl p-8 border border-white/5">
        {/* Avatar Section */}
        <div className="flex items-center mb-8 pb-8 border-b border-white/5">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center overflow-hidden">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="w-20 h-20 object-cover"
              />
            ) : (
              <UserCircleIcon className="w-12 h-12 text-white/20" />
            )}
          </div>
          <div className="ml-6">
            <h3 className="text-lg font-medium text-white">Profile Picture</h3>
            <p className="text-sm text-white/60 mb-4">
              Upload a new profile picture or remove the current one
            </p>
            <div className="flex space-x-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <span className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors inline-block">
                  Upload New
                </span>
              </label>
              {profile?.avatar_url && (
                <button
                  type="button"
                  onClick={handleAvatarRemove}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={updateProfile}>
          <div className="space-y-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                value={profile?.full_name || ''}
                onChange={(e) => setProfile(profile ? { ...profile, full_name: e.target.value } : null)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={profile?.username || ''}
                onChange={(e) => setProfile(profile ? { ...profile, username: e.target.value } : null)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20"
                placeholder="Choose a username"
              />
              <p className="mt-1 text-sm text-white/60">
                This will be your public username visible to other users.
              </p>
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-white mb-2">
                Website
              </label>
              <input
                type="url"
                id="website"
                value={profile?.website || ''}
                onChange={(e) => setProfile(profile ? { ...profile, website: e.target.value } : null)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-white mb-2">
                Bio
              </label>
              <textarea
                id="bio"
                value={profile?.bio || ''}
                onChange={(e) => setProfile(profile ? { ...profile, bio: e.target.value } : null)}
                rows={4}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20"
                placeholder="Write a short bio about yourself"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 