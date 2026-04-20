/**
 * @jest-environment node
 */
const path = require('path');

// Load mock data directly
let mockData;
try {
  mockData = require('../../lib/mock-data');
} catch (e) {
  mockData = null;
}

describe('Mock data integrity', () => {
  it('mock-data module loads without errors', () => {
    expect(mockData).not.toBeNull();
  });

  describe('dashboardMetrics', () => {
    it('exports dashboardMetrics array', () => {
      expect(Array.isArray(mockData.dashboardMetrics)).toBe(true);
      expect(mockData.dashboardMetrics.length).toBeGreaterThan(0);
    });

    it('each metric has required fields', () => {
      mockData.dashboardMetrics.forEach((m) => {
        expect(m).toHaveProperty('label');
        expect(m).toHaveProperty('value');
        expect(m).toHaveProperty('delta');
        expect(m).toHaveProperty('trend');
        expect(['up', 'down', 'neutral']).toContain(m.trend);
      });
    });
  });

  describe('alerts', () => {
    it('exports alerts array', () => {
      expect(Array.isArray(mockData.alerts)).toBe(true);
    });

    it('each alert has required fields', () => {
      mockData.alerts.forEach((a) => {
        expect(a).toHaveProperty('id');
        expect(a).toHaveProperty('title');
        expect(a).toHaveProperty('severity');
        expect(a).toHaveProperty('description');
        expect(['critical', 'high', 'medium', 'info', 'low']).toContain(a.severity);
      });
    });

    it('alerts have boolean read field', () => {
      mockData.alerts.forEach((a) => {
        expect(typeof a.read).toBe('boolean');
      });
    });
  });

  describe('creativeLibrary', () => {
    it('exports creativeLibrary array', () => {
      expect(Array.isArray(mockData.creativeLibrary)).toBe(true);
    });

    it('each creative has format and score fields', () => {
      mockData.creativeLibrary.forEach((c) => {
        expect(c).toHaveProperty('id');
        expect(c).toHaveProperty('name');
        expect(c).toHaveProperty('score');
        expect(c).toHaveProperty('format');
      });
    });
  });

  describe('competitors', () => {
    it('exports competitors array', () => {
      expect(Array.isArray(mockData.competitors)).toBe(true);
    });

    it('each competitor has threat and estimatedSpend', () => {
      mockData.competitors.forEach((c) => {
        expect(c).toHaveProperty('name');
        expect(c).toHaveProperty('threat');
        expect(c).toHaveProperty('estimatedSpend');
      });
    });
  });

  describe('integrations', () => {
    it('exports integrations array', () => {
      expect(Array.isArray(mockData.integrations)).toBe(true);
    });

    it('each integration has a status field', () => {
      mockData.integrations.forEach((i) => {
        expect(i).toHaveProperty('name');
        expect(i).toHaveProperty('status');
      });
    });
  });

  describe('performanceSeries', () => {
    it('exports performanceSeries with date, roas, ctr fields', () => {
      expect(Array.isArray(mockData.performanceSeries)).toBe(true);
      mockData.performanceSeries.forEach((p) => {
        expect(p).toHaveProperty('date');
        expect(p).toHaveProperty('roas');
        expect(p).toHaveProperty('ctr');
      });
    });
  });

  describe('nextBestActions', () => {
    it('exports nextBestActions with action and impact fields', () => {
      expect(Array.isArray(mockData.nextBestActions)).toBe(true);
      mockData.nextBestActions.forEach((a) => {
        expect(a).toHaveProperty('action');
        expect(a).toHaveProperty('impact');
      });
    });
  });
});
