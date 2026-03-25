import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signInAsync, signInWithGoogleAsync, clearError } from '../../store/slices/authSlice';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const validateForm = () => {
    if (!email) {
      setLocalError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setLocalError('Please enter a valid email');
      return false;
    }
    if (!password) {
      setLocalError('Password is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!validateForm()) return;

    dispatch(signInAsync({ email, password })).then((result) => {
      if (result.payload?.uid) {
        navigate('/dashboard');
      }
    });
  };

  const handleGoogleSignIn = () => {
    setLocalError('');
    dispatch(signInWithGoogleAsync()).then((result) => {
      if (result.payload?.uid) {
        navigate('/dashboard');
      }
    });
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text-vibrant mb-2">Ember</h1>
          <p className="text-foreground/60">Welcome back to your wellness journey</p>
        </div>

        {/* Login Card */}
        <div className="modern-card rounded-2xl p-8 border border-border shadow-lg mb-6">
          {/* Error Message */}
          {displayError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800">{displayError}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLocalError('');
                }}
                className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-vibrant-orange focus:border-transparent transition-all"
                placeholder="your@email.com"
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLocalError('');
                  }}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-vibrant-orange focus:border-transparent transition-all"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={loading}
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                to="/password-reset"
                className="text-sm text-vibrant-orange hover:text-vibrant-orange/80 transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              variant="default"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center space-x-3">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Google Sign In */}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={loading}
            iconName="Globe"
            iconPosition="left"
          >
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-foreground/60 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-vibrant-orange hover:text-vibrant-orange/80 font-semibold transition-colors">
              Create one
            </Link>
          </p>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-vibrant-orange/5 border border-vibrant-orange/20 rounded-lg text-center">
          <p className="text-sm text-foreground/70">
            Demo account available:{' '}
            <span className="font-mono text-vibrant-orange">demo@ember.com</span> / <span className="font-mono text-vibrant-orange">password</span>
          </p>
        </div>
      </div>
    </div>
  );
}
