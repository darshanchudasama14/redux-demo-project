import favoritesReducer, {
  toggleFavorite,
  addFavorite,
  removeFavorite,
  clearFavorites,
} from '../src/redux/slices/favoritesSlice';
import authReducer, { logout } from '../src/redux/slices/authSlice';

describe('Redux favoritesSlice', () => {
  const initialState = { favoriteIds: ['evt-1'] };

  it('should handle initial state', () => {
    expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual({
      favoriteIds: [],
    });
  });

  it('should toggle favorite (remove existing id)', () => {
    const actual = favoritesReducer(initialState, toggleFavorite('evt-1'));
    expect(actual.favoriteIds).toEqual([]);
  });

  it('should toggle favorite (add new id)', () => {
    const actual = favoritesReducer(initialState, toggleFavorite('evt-2'));
    expect(actual.favoriteIds).toEqual(['evt-1', 'evt-2']);
  });

  it('should add a favorite id', () => {
    const actual = favoritesReducer(initialState, addFavorite('evt-3'));
    expect(actual.favoriteIds).toContain('evt-3');
  });

  it('should remove a favorite id', () => {
    const actual = favoritesReducer(initialState, removeFavorite('evt-1'));
    expect(actual.favoriteIds).not.toContain('evt-1');
  });

  it('should clear all favorites', () => {
    const actual = favoritesReducer(initialState, clearFavorites());
    expect(actual.favoriteIds).toEqual([]);
  });
});

describe('Redux authSlice', () => {
  it('should handle logout', () => {
    const state = {
      user: { id: '1', email: 'test@plie.com', name: 'Test User' },
      token: 'token-123',
      isAuthenticated: true,
      isGuest: false,
      loading: false,
      error: null,
    };
    const actual = authReducer(state, logout());
    expect(actual.isAuthenticated).toBe(false);
    expect(actual.user).toBeNull();
    expect(actual.token).toBeNull();
  });
});
