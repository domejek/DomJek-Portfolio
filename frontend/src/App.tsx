import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';

const BlogList = lazy(() =>
  import('./components/blog/BlogList').then((m) => ({ default: m.BlogList })),
);
const BlogPost = lazy(() =>
  import('./components/blog/BlogPost').then((m) => ({ default: m.BlogPost })),
);
const ProjectDetail = lazy(() =>
  import('./components/projekte/ProjectDetail').then((m) => ({ default: m.ProjectDetail })),
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'blog', element: <BlogList /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'projekte/:slug', element: <ProjectDetail /> },
      { path: '*', element: <HomePage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}