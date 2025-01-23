import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Industry data organized by sector and region
const industryData = {
  banking: {
    UK: {
      averageSalary: 50000,
      costHiringExternally: 10000,
      costReskillingInternally: 5000,
      productivityUplift: 15,
      retentionIncrease: 20,
      costTurnover: 30000,
      onboardingCost: 5000
    },
    HK: {
      averageSalary: 600000,
      costHiringExternally: 80000,
      costReskillingInternally: 40000,
      productivityUplift: 12,
      retentionIncrease: 15,
      costTurnover: 250000,
      onboardingCost: 40000
    },
    Australia: {
      averageSalary: 90000,
      costHiringExternally: 15000,
      costReskillingInternally: 8000,
      productivityUplift: 10,
      retentionIncrease: 18,
      costTurnover: 50000,
      onboardingCost: 7000
    }
  },
  insurance: {
    UK: {
      averageSalary: 45000,
      costHiringExternally: 8000,
      costReskillingInternally: 4000,
      productivityUplift: 12,
      retentionIncrease: 18,
      costTurnover: 25000,
      onboardingCost: 4000
    },
    HK: {
      averageSalary: 500000,
      costHiringExternally: 70000,
      costReskillingInternally: 35000,
      productivityUplift: 10,
      retentionIncrease: 12,
      costTurnover: 200000,
      onboardingCost: 35000
    },
    Australia: {
      averageSalary: 85000,
      costHiringExternally: 12000,
      costReskillingInternally: 7000,
      productivityUplift: 8,
      retentionIncrease: 15,
      costTurnover: 45000,
      onboardingCost: 6000
    }
  },
  law: {
    UK: {
      averageSalary: 60000,
      costHiringExternally: 12000,
      costReskillingInternally: 6000,
      productivityUplift: 10,
      retentionIncrease: 15,
      costTurnover: 35000,
      onboardingCost: 6000
    },
    HK: {
      averageSalary: 800000,
      costHiringExternally: 100000,
      costReskillingInternally: 50000,
      productivityUplift: 8,
      retentionIncrease: 10,
      costTurnover: 300000,
      onboardingCost: 50000
    },
    Australia: {
      averageSalary: 100000,
      costHiringExternally: 18000,
      costReskillingInternally: 10000,
      productivityUplift: 7,
      retentionIncrease: 12,
      costTurnover: 60000,
      onboardingCost: 8000
    }
  }
};

const ROICalculator = () => {
  // State for inputs
  const [inputs, setInputs] = useState({
    totalEmployees: 1000,
    reskillingPercentage: 40,
    sector: 'banking',
    region: 'UK'
  });

  // Get industry specific data based on sector and region
  const sectorData = industryData[inputs.sector][inputs.region];

  // Calculate number of employees to reskill
  const employeesToReskill = Math.floor(inputs.totalEmployees * (inputs.reskillingPercentage / 100));

  // Calculate costs
  const costHiringExternally = employeesToReskill * sectorData.costHiringExternally;
  const costReskillingInternally = employeesToReskill * sectorData.costReskillingInternally;

  // Calculate benefits
  const productivitySavings = employeesToReskill * sectorData.averageSalary * (sectorData.productivityUplift / 100);
  const retentionSavings = employeesToReskill * sectorData.costTurnover * (sectorData.retentionIncrease / 100);
  const onboardingSavings = employeesToReskill * sectorData.onboardingCost;
  const totalFinancialBenefits = productivitySavings + retentionSavings + onboardingSavings;

  // Calculate ROI
  const netBenefit = totalFinancialBenefits - costReskillingInternally;
  const roi = ((totalFinancialBenefits - costReskillingInternally) / costReskillingInternally) * 100;

  // Format currency based on region
  const formatCurrency = (value) => {
    const currencySymbols = {
      UK: '£',
      HK: 'HK$',
      Australia: 'AU$'
    };
    return `${currencySymbols[inputs.region]}${value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Maia L&D ROI Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Input Section */}
          <div className="grid gap-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold">Inputs</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Total Employees</label>
                <input
                  type="number"
                  name="totalEmployees"
                  value={inputs.totalEmployees}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Percentage Needing Reskilling (%)</label>
                <input
                  type="number"
                  name="reskillingPercentage"
                  value={inputs.reskillingPercentage}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Sector</label>
                <select
                  name="sector"
                  value={inputs.sector}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                >
                  <option value="banking">Banking</option>
                  <option value="insurance">Insurance</option>
                  <option value="law">Law</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Region</label>
                <select
                  name="region"
                  value={inputs.region}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                >
                  <option value="UK">UK</option>
                  <option value="HK">Hong Kong</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>
          </div>

          {/* Industry Averages Section */}
          <div className="grid gap-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold">Industry Averages</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>Average Salary: {formatCurrency(sectorData.averageSalary)}</div>
              <div>Cost of Hiring: {formatCurrency(sectorData.costHiringExternally)}</div>
              <div>Cost of Reskilling: {formatCurrency(sectorData.costReskillingInternally)}</div>
              <div>Productivity Uplift: {sectorData.productivityUplift}%</div>
              <div>Retention Increase: {sectorData.retentionIncrease}%</div>
              <div>Cost of Turnover: {formatCurrency(sectorData.costTurnover)}</div>
            </div>
          </div>

          {/* Results Section */}
          <div className="grid gap-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold">Results</h3>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span>Employees to Reskill:</span>
                <span className="font-semibold">{employeesToReskill}</span>
              </div>
              <div className="flex justify-between">
                <span>Cost of Hiring Externally:</span>
                <span className="font-semibold">{formatCurrency(costHiringExternally)}</span>
              </div>
              <div className="flex justify-between">
                <span>Cost of Reskilling Internally:</span>
                <span className="font-semibold">{formatCurrency(costReskillingInternally)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Financial Benefits:</span>
                <span className="font-semibold">{formatCurrency(totalFinancialBenefits)}</span>
              </div>
              <div className="flex justify-between">
                <span>Net Benefit:</span>
                <span className="font-semibold">{formatCurrency(netBenefit)}</span>
              </div>
              <div className="flex justify-between">
                <span>ROI of Reskilling:</span>
                <span className="font-semibold">{roi.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ROICalculator;
