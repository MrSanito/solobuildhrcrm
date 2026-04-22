const fs = require('fs');

const content = fs.readFileSync('src/app/Hiring.tsx', 'utf8');

const sections = content.split(/\/\*\s*───\s*(.*?)\s*─*\s*\*\//);

// sections[0] is the preamble (imports)
// sections[1] is the name of first block: "Types"
// sections[2] is the content of first block
// and so on...

let dataContent = "import {\n" + 
  "  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar\n" +
  "} from 'recharts';\n" +
  "import * as Icons from 'lucide-react';\n" +
  "const { Briefcase, Users, CalendarDays, CheckCircle2, Clock, AlertTriangle, Star, Target, X, MessageSquare, TrendingUp, TrendingDown, FileText, DollarSign } = Icons;\n\n";

let sharedContent = `import * as React from 'react';\n`;

let rolesTabContent = `import React, { useState } from 'react';\nimport * as Icons from 'lucide-react';\nimport { PieChart, Pie, Cell } from 'recharts';\nimport { roles, backendSkills, topSources } from './data';\nimport { PipelineBadge, UrgencyBadge } from './Shared';\n\nconst { Briefcase, Clock, TrendingUp, Edit3, MoreVertical, Search, Filter, ChevronRight, Plus, Download } = Icons;\n\n`;

let screeningTabContent = `import React, { useState } from 'react';\nimport * as Icons from 'lucide-react';\nimport { screeningBuckets, candidates } from './data';\nimport { Avatar } from './Shared';\n\nconst { Search, Filter, ChevronDown, MapPin, X, Sparkles } = Icons;\n\n`;

let pipelineTabContent = `import React, { useState } from 'react';\nimport * as Icons from 'lucide-react';\nimport { pipelineColumns, conversionData, timeInStageData, priorityData, topRolesPipeline } from './data';\nimport { Avatar } from './Shared';\nimport { PieChart, Pie, Cell, LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';\n\nconst { Search, Filter, MoreVertical, Download, CheckCircle2, Users, Activity, Star, ChevronRight, X } = Icons;\n\n`;

let interviewsTabContent = `import React, { useState } from 'react';\nimport * as Icons from 'lucide-react';\nimport { interviewKpis, interviews } from './data';\nimport { Avatar, StatusBadge } from './Shared';\n\nconst { TrendingUp, TrendingDown, ChevronLeft, Calendar, ChevronRight, Filter, Plus, MoreVertical, Star, Video, X, FileText, Mail, Phone } = Icons;\n\n`;

let offersTabContent = `import React, { useState } from 'react';\nimport * as Icons from 'lucide-react';\nimport { offerKpis, offers } from './data';\nimport { Avatar, StatusBadge } from './Shared';\n\nconst { TrendingUp, TrendingDown, Search, Filter, MoreVertical, ChevronRight, ChevronDown, Plus, Download, Eye, X, Star, FileText } = Icons;\n\n`;

for(let i = 1; i < sections.length; i+=2) {
    const title = sections[i].trim();
    const body = sections[i+1];
    
    if (title === 'Types' || title === 'Shared Mock Data' || title === 'Pipeline Data' || title === 'Interviews Data' || title === 'Offers Data') {
        dataContent += body;
    } else if (title === 'Avatar Helper' || title === 'Badge helpers') {
        sharedContent += body;
    } else if (title === 'Backend Developer Detail Panel' || title === 'Roles Tab') {
        rolesTabContent += body;
    } else if (title === 'Candidate Detail (Screening)' || title === 'Screening Tab') {
        screeningTabContent += body;
    } else if (title === 'Pipeline Candidate Detail' || title === 'Pipeline Tab') {
        pipelineTabContent += body;
    } else if (title === 'Interview Candidate Detail' || title === 'Interviews Tab') {
        interviewsTabContent += body;
    } else if (title === 'Offer Detail Panel' || title === 'Offers Tab') {
        offersTabContent += body;
    }
}

// Add exports to dataContent variables
dataContent = dataContent
    .replace(/const topSources/g, 'export const topSources')
    .replace(/const backendSkills/g, 'export const backendSkills')
    .replace(/const roles =/g, 'export const roles =')
    .replace(/const kpiCards/g, 'export const kpiCards')
    .replace(/const screeningBuckets/g, 'export const screeningBuckets')
    .replace(/const candidates/g, 'export const candidates')
    .replace(/const pipelineColumns/g, 'export const pipelineColumns')
    .replace(/const conversionData/g, 'export const conversionData')
    .replace(/const timeInStageData/g, 'export const timeInStageData')
    .replace(/const priorityData/g, 'export const priorityData')
    .replace(/const topRolesPipeline/g, 'export const topRolesPipeline')
    .replace(/const interviewKpis/g, 'export const interviewKpis')
    .replace(/const interviews/g, 'export const interviews')
    .replace(/const offerKpis/g, 'export const offerKpis')
    .replace(/const offers/g, 'export const offers')
    .replace(/type TabName/g, 'export type TabName');

sharedContent = sharedContent
    .replace(/function Avatar/g, 'export function Avatar')
    .replace(/function UrgencyBadge/g, 'export function UrgencyBadge')
    .replace(/function PipelineBadge/g, 'export function PipelineBadge')
    .replace(/function StatusBadge/g, 'export function StatusBadge');

rolesTabContent = rolesTabContent.replace(/function RolesTab/g, 'export function RolesTab');
screeningTabContent = screeningTabContent.replace(/function ScreeningTab/g, 'export function ScreeningTab');
pipelineTabContent = pipelineTabContent.replace(/function PipelineTab/g, 'export function PipelineTab');
interviewsTabContent = interviewsTabContent.replace(/function InterviewsTab/g, 'export function InterviewsTab');
offersTabContent = offersTabContent.replace(/function OffersTab/g, 'export function OffersTab');

fs.writeFileSync('src/components/Hiring/data.tsx', dataContent);
fs.writeFileSync('src/components/Hiring/Shared.tsx', sharedContent);
fs.writeFileSync('src/components/Hiring/RolesTab.tsx', rolesTabContent);
fs.writeFileSync('src/components/Hiring/ScreeningTab.tsx', screeningTabContent);
fs.writeFileSync('src/components/Hiring/PipelineTab.tsx', pipelineTabContent);
fs.writeFileSync('src/components/Hiring/InterviewsTab.tsx', interviewsTabContent);
fs.writeFileSync('src/components/Hiring/OffersTab.tsx', offersTabContent);

console.log("Done extracting components.");
