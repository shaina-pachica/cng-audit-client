import { useState } from 'react';

import { Input } from './components/ui/input';
import type React from 'react';
import { Lock, Mail } from 'lucide-react';
import { DeveloperCredit } from './components/devcredit';
import { useLogin } from './services/auth/useLogin';
import { toast } from 'sonner';
import { Button } from './components/ui/button';



interface LoginResponse {
  accessToken: string;
  roles: string[];
}

export default function Home() {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  // const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await toast.promise(loginMutation.mutateAsync({ username, password }), {
        loading: 'Checking server, wait lang po',
        success: (res: LoginResponse) => {
          localStorage.setItem('accessToken', res.accessToken);
          if (res.roles.includes('Owner')) {
           // router.push('/dashboard/owner');
          } else {
            // router.push('/dashboard/employee');
          }
          return 'Welcome po';
        },
        error: () => 'May error po',
      });
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-radial from-[#86aae0] via-[#5f93e0] to-[#0248b2] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-40 h-40 bg-white/10 rounded-full">
              <img
                src="/g-audit.png"
                alt="App Logo"
                width={180}
                height={100}
                className="rounded-xl"
              />
            </div>
          </div>
          <h1 className="font-bold text-white mb-2 text-5xl">G-Audit</h1>
          <p className="text-blue-100 text-sm">
            Sign in to access your dashboard
          </p>
        </header>

        <div className="bg-card rounded-lg shadow-2xl overflow-hidden">
          <div className="px-10 py-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="pl-10 h-10 text-sm bg-background border-border focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 h-10 text-sm bg-background border-border focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-md bg-destructive/10 border border-destructive/30">
                  <p className="text-xs text-destructive">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-md transition-colors"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <DeveloperCredit />
    </div>
  );
}
