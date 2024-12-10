-- Allow public access to view avatars
CREATE POLICY "Give public access to avatars" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'avatars');

-- Allow authenticated users to upload avatars
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[2]
  );

-- Allow users to update their own avatar
CREATE POLICY "Allow individual update" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = (storage.foldername(name))[2])
  WITH CHECK (bucket_id = 'avatars');

-- Allow users to delete their own avatar
CREATE POLICY "Allow individual delete" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = (storage.foldername(name))[2]); 