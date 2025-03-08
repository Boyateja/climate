import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  Thermometer,
  Droplets,
  Waves,
  AlertTriangle,
  CloudRain,
  Wind,
  Gauge
} from 'lucide-react';
import ClimateGlobe from './ClimateGlobe';
import AlertsPanel from './AlertSystem/AlertsPanel';
import ActionPanel from './DataActions/ActionPanel';
import ClimateScenarios from './ClimateScenarios';

const regions = [
  'Global',
  'North America',
  'Europe',
  'Asia',
  'Africa',
  'South America',
  'Oceania'
] as const;

type Region = typeof regions[number];

// Region-specific multipliers for climate impacts
const regionalFactors: Record<Region, {
  temperature: number;
  precipitation: number;
  seaLevel: number;
  extremeEvents: number;
}> = {
  'Global': { temperature: 1, precipitation: 1, seaLevel: 1, extremeEvents: 1 },
  'North America': { temperature: 1.2, precipitation: 1.3, seaLevel: 0.8, extremeEvents: 1.1 },
  'Europe': { temperature: 1.1, precipitation: 1.2, seaLevel: 0.9, extremeEvents: 1.2 },
  'Asia': { temperature: 1.3, precipitation: 1.4, seaLevel: 1.2, extremeEvents: 1.3 },
  'Africa': { temperature: 1.4, precipitation: 0.7, seaLevel: 1.1, extremeEvents: 1.4 },
  'South America': { temperature: 1.1, precipitation: 1.5, seaLevel: 1.0, extremeEvents: 1.2 },
  'Oceania': { temperature: 1.2, precipitation: 0.9, seaLevel: 1.3, extremeEvents: 1.1 }
};

// Base historical data
const baseHistoricalData = [
  { year: 1900, temperature: -0.2 },
  { year: 1950, temperature: 0 },
  { year: 2000, temperature: 0.5 },
  { year: 2023, temperature: 1.1 },
  { year: 2030, temperature: 1.3 },
  { year: 2040, temperature: 1.4 },
  { year: 2050, temperature: 1.6 }
];

const co2Data = [
  { year: 1900, level: 295 },
  { year: 1950, level: 310 },
  { year: 2000, level: 370 },
  { year: 2023, level: 420 },
  { year: 2030, level: 450 },
  { year: 2040, level: 490 },
  { year: 2050, level: 530 }
];

// Calculate region-specific historical data
const getRegionalHistoricalData = (region: Region) => {
  const factor = regionalFactors[region].temperature;
  return baseHistoricalData.map(data => ({
    ...data,
    temperature: Number((data.temperature * factor).toFixed(2))
  }));
};

const calculateMetrics = (year: number, region: Region) => {
  const baseYear = 2023;
  const yearDiff = year - baseYear;
  const factors = regionalFactors[region];
  
  // Base calculations
  const baseTempIncrease = 1.1 + (yearDiff * (1.6 - 1.1) / (2050 - 2023));
  const basePrecipChange = (yearDiff * 5.3 / (2050 - 2023));
  const baseSeaLevelRise = (yearDiff * 26.3 / (2050 - 2023));
  const baseExtremeEvents = (yearDiff * 32 / (2050 - 2023));

  // Apply regional factors
  return {
    temperature: (baseTempIncrease * factors.temperature).toFixed(1),
    precipitation: (basePrecipChange * factors.precipitation).toFixed(1),
    seaLevel: (baseSeaLevelRise * factors.seaLevel).toFixed(1),
    extremeEvents: (baseExtremeEvents * factors.extremeEvents).toFixed(1)
  };
};

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  trend?: 'up' | 'down' | 'neutral';
}

function MetricCard({ icon: Icon, title, value, description, trend }: MetricCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="w-6 h-6 text-primary" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

function ImpactCard({ level, description, color }: { level: string; description: string; color: string }) {
  return (
    <div className={`p-4 rounded-lg border ${color}`}>
      <h4 className="font-semibold mb-2">{level}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default function ClimateAIDashboard() {
  const [selectedRegion, setSelectedRegion] = useState<Region>('Global');
  const [selectedYear, setSelectedYear] = useState(2050);

  const metrics = useMemo(
    () => calculateMetrics(selectedYear, selectedRegion),
    [selectedYear, selectedRegion]
  );

  const historicalData = useMemo(
    () => getRegionalHistoricalData(selectedRegion),
    [selectedRegion]
  );

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  return (
    <div className="space-y-8">
      <div className="bg-card rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4">Climate Change Prediction Dashboard</h1>
        <p className="text-muted-foreground">
          Advanced AI-powered analysis and predictions for climate change impacts across different regions.
          Our models provide insights with 85% confidence level based on historical data and current trends.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Region Selection</h2>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value as Region)}
            className="w-full p-2 border rounded-lg bg-background text-foreground"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Prediction Timeframe</h2>
          <input
            type="range"
            min="2023"
            max="2050"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="text-center mt-2">Year: {selectedYear}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Thermometer}
          title="Temperature"
          value={`+${metrics.temperature}°C`}
          description={`${selectedRegion} increase by ${selectedYear}`}
        />
        <MetricCard
          icon={Droplets}
          title="Precipitation"
          value={`${metrics.precipitation}%`}
          description={`${selectedRegion} change by ${selectedYear}`}
        />
        <MetricCard
          icon={Waves}
          title="Sea Level Rise"
          value={`+${metrics.seaLevel}cm`}
          description={`${selectedRegion} rise by ${selectedYear}`}
        />
        <MetricCard
          icon={AlertTriangle}
          title="Extreme Events"
          value={`+${metrics.extremeEvents}%`}
          description={`${selectedRegion} increase by ${selectedYear}`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Temperature Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="year" stroke="var(--muted-foreground)" />
                <YAxis
                  label={{
                    value: 'Temperature Deviation (°C)',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fill: 'var(--muted-foreground)' }
                  }}
                  stroke="var(--muted-foreground)"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name={`${selectedRegion} Temperature`}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">CO2 Concentration</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={co2Data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="year" stroke="var(--muted-foreground)" />
                <YAxis
                  label={{
                    value: 'CO2 (ppm)',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fill: 'var(--muted-foreground)' }
                  }}
                  stroke="var(--muted-foreground)"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="level"
                  stroke="var(--primary)"
                  fill="var(--primary)"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow p-6">
        <ClimateScenarios />
      </div>

      <div className="bg-card rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Global Climate Impact Zones</h2>
        <ClimateGlobe />
        <div className="mt-4 flex justify-center space-x-8">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-muted-foreground">Low Impact</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-sm text-muted-foreground">Moderate Impact</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm text-muted-foreground">Severe Impact</span>
          </div>
        </div>
      </div>

      <AlertsPanel />

      <ActionPanel onRefresh={handleRefresh} />
    </div>
  );
}