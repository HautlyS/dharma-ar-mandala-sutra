import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModelViewer from '@/components/ModelViewer';
import { mockCharacter, mockFetch, cleanup } from '../setup';

// Mock the hooks
vi.mock('@/hooks/useModelCache', () => ({
  useModelCache: () => ({
    loadModel: vi.fn().mockResolvedValue('mock-cached-url'),
    stats: { hitRate: 0.8, entryCount: 5, totalSize: 1000000, hits: 8, misses: 2 }
  })
}));

vi.mock('@/hooks/usePerformanceMonitor', () => ({
  usePerformanceMonitor: () => ({
    metrics: { fps: 60, memoryUsage: 1000000, loadTime: 500, renderTime: 16, isLowPerformance: false },
    measureLoadTime: vi.fn(),
    getAutoOptimizationSettings: () => ({
      modelQuality: 'high',
      enableAnimations: true,
      enableShadows: true,
      enableReflections: true,
      maxConcurrentModels: 3
    }),
    getPerformanceGrade: () => ({ grade: 'A', color: 'green', description: 'Excelente' })
  })
}));

describe('ModelViewer', () => {
  const defaultProps = {
    modelUrl: 'https://example.com/model.glb',
    characterName: 'Test Character'
  };

  beforeEach(() => {
    cleanup();
    mockFetch(new ArrayBuffer(1000));
  });

  it('renders loading state initially', () => {
    render(<ModelViewer {...defaultProps} />);
    
    expect(screen.getByText(/carregando test character/i)).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error state when model fails to load', async () => {
    const onError = vi.fn();
    
    // Mock failed fetch
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    
    render(<ModelViewer {...defaultProps} onError={onError} />);
    
    await waitFor(() => {
      expect(screen.getByText(/erro ao carregar modelo 3d/i)).toBeInTheDocument();
    });
    
    expect(onError).toHaveBeenCalledWith(expect.any(Error));
  });

  it('displays retry button on error', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    
    render(<ModelViewer {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.getByText(/tentar novamente/i)).toBeInTheDocument();
    });
    
    const retryButton = screen.getByRole('button', { name: /tentar novamente/i });
    expect(retryButton).toBeInTheDocument();
  });

  it('calls onLoadStart and onLoadComplete callbacks', async () => {
    const onLoadStart = vi.fn();
    const onLoadComplete = vi.fn();
    
    render(
      <ModelViewer 
        {...defaultProps} 
        onLoadStart={onLoadStart}
        onLoadComplete={onLoadComplete}
      />
    );
    
    expect(onLoadStart).toHaveBeenCalled();
    
    // Simulate model load completion
    await waitFor(() => {
      const modelViewer = document.querySelector('model-viewer');
      if (modelViewer) {
        modelViewer.dispatchEvent(new CustomEvent('load'));
      }
    });
    
    expect(onLoadComplete).toHaveBeenCalled();
  });

  it('shows performance info when enabled', () => {
    render(<ModelViewer {...defaultProps} showPerformanceInfo={true} />);
    
    expect(screen.getByText(/fps: 60/i)).toBeInTheDocument();
    expect(screen.getByText(/mem: 1mb/i)).toBeInTheDocument();
  });

  it('displays control instructions', () => {
    render(<ModelViewer {...defaultProps} />);
    
    expect(screen.getByText(/clique e arraste para orbitar/i)).toBeInTheDocument();
    expect(screen.getByText(/toque e arraste no mobile/i)).toBeInTheDocument();
    expect(screen.getByText(/scroll para zoom/i)).toBeInTheDocument();
  });

  it('shows settings panel when settings button is clicked', async () => {
    const user = userEvent.setup();
    
    render(<ModelViewer {...defaultProps} showPerformanceInfo={true} />);
    
    const settingsButton = screen.getByRole('button', { name: /settings/i });
    await user.click(settingsButton);
    
    expect(screen.getByText(/configurações 3d/i)).toBeInTheDocument();
    expect(screen.getByText(/qualidade:/i)).toBeInTheDocument();
  });

  it('applies auto-optimization settings', () => {
    render(<ModelViewer {...defaultProps} enableAutoOptimization={true} />);
    
    // Check if the component renders without errors with auto-optimization
    expect(screen.getByText(/carregando test character/i)).toBeInTheDocument();
  });

  it('handles different priority levels', () => {
    const { rerender } = render(<ModelViewer {...defaultProps} priority="high" />);
    
    expect(screen.getByText(/carregando test character/i)).toBeInTheDocument();
    
    rerender(<ModelViewer {...defaultProps} priority="low" />);
    
    expect(screen.getByText(/carregando test character/i)).toBeInTheDocument();
  });

  it('displays cache statistics in loading state', () => {
    render(<ModelViewer {...defaultProps} />);
    
    expect(screen.getByText(/cache: 80% hit rate/i)).toBeInTheDocument();
  });

  it('shows optimized mode indicator when auto-optimization is active', () => {
    render(<ModelViewer {...defaultProps} enableAutoOptimization={true} />);
    
    expect(screen.getByText(/modo otimizado: high/i)).toBeInTheDocument();
  });

  it('handles model viewer script loading', async () => {
    // Mock script loading
    const mockScript = document.createElement('script');
    const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(mockScript);
    
    render(<ModelViewer {...defaultProps} />);
    
    expect(createElementSpy).toHaveBeenCalledWith('script');
    
    // Simulate script load
    mockScript.onload?.(new Event('load'));
    
    await waitFor(() => {
      expect(screen.getByText(/carregando test character/i)).toBeInTheDocument();
    });
    
    createElementSpy.mockRestore();
  });

  it('handles progress updates', async () => {
    render(<ModelViewer {...defaultProps} />);
    
    // Simulate progress event
    await waitFor(() => {
      const modelViewer = document.querySelector('model-viewer');
      if (modelViewer) {
        modelViewer.dispatchEvent(new CustomEvent('progress', {
          detail: { totalProgress: 0.5 }
        }));
      }
    });
    
    expect(screen.getByText('50%')).toBeInTheDocument();
  });
});
