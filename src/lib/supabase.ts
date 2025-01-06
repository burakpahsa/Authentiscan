import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rmnchopvunmpgushbkft.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtbmNob3B2dW5tcGd1c2hia2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5OTMyNzQsImV4cCI6MjA0ODU2OTI3NH0.XDl2Gv1yzf5oVOjujOr5YSBT7_sz9aDgHLOSPcaYTYg';

export const supabase = createClient(supabaseUrl, supabaseKey);