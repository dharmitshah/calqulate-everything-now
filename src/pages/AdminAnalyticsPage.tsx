import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Calculator, Eye, Lock } from 'lucide-react';
import { format } from 'date-fns';
import type { Tables } from '@/integrations/supabase/types';

type CalculatorUsage = Tables<'calculator_usage'>;
type SearchLog = Tables<'search_logs'>;
type PageView = Tables<'page_views'>;

interface Stats {
  totalCalculatorUsage: number;
  totalSearches: number;
  totalPageViews: number;
  topCalculators: { name: string; count: number }[];
  topSearches: { query: string; count: number }[];
  topPages: { path: string; count: number }[];
}

const AdminAnalyticsPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [calculatorUsage, setCalculatorUsage] = useState<CalculatorUsage[]>([]);
  const [searchLogs, setSearchLogs] = useState<SearchLog[]>([]);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [loading, setLoading] = useState(false);

  // Simple password check - you should use proper auth in production
  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Sign in with Supabase auth
      const { error } = await supabase.auth.signInWithPassword({
        email: 'admin@quickulus.com',
        password: password,
      });

      if (error) {
        setError('Invalid credentials. Please check your password.');
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      await fetchData();
    } catch (err) {
      setError('Login failed. Please try again.');
    }
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch calculator usage
      const { data: calcData } = await supabase
        .from('calculator_usage')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      setCalculatorUsage(calcData || []);

      // Fetch search logs
      const { data: searchData } = await supabase
        .from('search_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      setSearchLogs(searchData || []);

      // Fetch page views
      const { data: viewsData } = await supabase
        .from('page_views')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      setPageViews(viewsData || []);

      // Calculate stats
      const topCalcs = (calcData || []).reduce((acc: Record<string, number>, item) => {
        acc[item.calculator_name] = (acc[item.calculator_name] || 0) + 1;
        return acc;
      }, {});

      const topSearchTerms = (searchData || []).reduce((acc: Record<string, number>, item) => {
        acc[item.search_query] = (acc[item.search_query] || 0) + 1;
        return acc;
      }, {});

      const topPaths = (viewsData || []).reduce((acc: Record<string, number>, item) => {
        acc[item.page_path] = (acc[item.page_path] || 0) + 1;
        return acc;
      }, {});

      setStats({
        totalCalculatorUsage: calcData?.length || 0,
        totalSearches: searchData?.length || 0,
        totalPageViews: viewsData?.length || 0,
        topCalculators: Object.entries(topCalcs)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10),
        topSearches: Object.entries(topSearchTerms)
          .map(([query, count]) => ({ query, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10),
        topPages: Object.entries(topPaths)
          .map(([path, count]) => ({ path, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10),
      });
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
        fetchData();
      }
    });
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container px-4 py-12 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <Lock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <CardTitle>Admin Analytics</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                This area is restricted to the development team.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button 
                onClick={handleLogin} 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={() => {
              supabase.auth.signOut();
              setIsAuthenticated(false);
            }}
          >
            Sign Out
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Calculator Usage</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalCalculatorUsage || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Search Queries</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalSearches || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalPageViews || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Calculators</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {stats?.topCalculators.map((item, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span className="truncate">{item.name}</span>
                    <span className="font-medium">{item.count}</span>
                  </li>
                ))}
                {!stats?.topCalculators.length && (
                  <li className="text-sm text-muted-foreground">No data yet</li>
                )}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {stats?.topSearches.map((item, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span className="truncate">{item.query}</span>
                    <span className="font-medium">{item.count}</span>
                  </li>
                ))}
                {!stats?.topSearches.length && (
                  <li className="text-sm text-muted-foreground">No data yet</li>
                )}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {stats?.topPages.map((item, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span className="truncate">{item.path}</span>
                    <span className="font-medium">{item.count}</span>
                  </li>
                ))}
                {!stats?.topPages.length && (
                  <li className="text-sm text-muted-foreground">No data yet</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tables */}
        <Tabs defaultValue="calculators" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calculators">Calculator Usage</TabsTrigger>
            <TabsTrigger value="searches">Search Logs</TabsTrigger>
            <TabsTrigger value="pageviews">Page Views</TabsTrigger>
          </TabsList>

          <TabsContent value="calculators">
            <Card>
              <CardHeader>
                <CardTitle>Recent Calculator Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Calculator</TableHead>
                        <TableHead>Input Data</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calculatorUsage.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.calculator_name}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              {JSON.stringify(item.input_data)}
                            </code>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {item.result_data && (
                              <code className="text-xs bg-muted px-2 py-1 rounded">
                                {JSON.stringify(item.result_data)}
                              </code>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {format(new Date(item.created_at), 'MMM d, HH:mm')}
                          </TableCell>
                        </TableRow>
                      ))}
                      {!calculatorUsage.length && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground">
                            No data yet
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="searches">
            <Card>
              <CardHeader>
                <CardTitle>Recent Search Queries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Query</TableHead>
                        <TableHead>Results</TableHead>
                        <TableHead>Page</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchLogs.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.search_query}</TableCell>
                          <TableCell>{item.results_count}</TableCell>
                          <TableCell className="text-sm">{item.page_path}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {format(new Date(item.created_at), 'MMM d, HH:mm')}
                          </TableCell>
                        </TableRow>
                      ))}
                      {!searchLogs.length && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground">
                            No data yet
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pageviews">
            <Card>
              <CardHeader>
                <CardTitle>Recent Page Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Page</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Referrer</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pageViews.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.page_path}</TableCell>
                          <TableCell className="max-w-xs truncate">{item.page_title}</TableCell>
                          <TableCell className="text-sm max-w-xs truncate">
                            {item.referrer || '-'}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {format(new Date(item.created_at), 'MMM d, HH:mm')}
                          </TableCell>
                        </TableRow>
                      ))}
                      {!pageViews.length && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground">
                            No data yet
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminAnalyticsPage;
