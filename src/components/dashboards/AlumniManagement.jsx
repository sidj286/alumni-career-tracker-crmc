@@ .. @@
 import React, { useState } from 'react';
 import { 
   Search, 
   Filter, 
   Plus, 
   Download, 
   Upload,
   MoreHorizontal,
   Edit,
   Trash2,
   Eye
 } from 'lucide-react';
-import { useAlumniData } from '../../hooks/useAlumniData';
+import { useAlumniData } from '../../hooks/useAlumniData.js';
 import { AddAlumniModal } from '../modals/AddAlumniModal';
 
 export function AlumniManagement() {