import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DietPlan } from '../types';

export async function generatePDF(dietPlan: DietPlan, userName: string): Promise<Blob> {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Header
  pdf.setFontSize(24);
  pdf.setTextColor(16, 185, 129); // Green color
  pdf.text('Personalized 7-Day Nutrition Plan', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  pdf.setFontSize(14);
  pdf.setTextColor(100, 100, 100);
  pdf.text(`Prepared for: ${userName}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });

  // Dietitian approval note
  yPosition += 15;
  pdf.setFontSize(10);
  pdf.setTextColor(59, 130, 246); // Blue color
  const approvalText = '* This program framework has been reviewed and approved by licensed dietitians';
  pdf.text(approvalText, pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 20;

  // Overview
  pdf.setFontSize(16);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Overview', 20, yPosition);
  yPosition += 10;
  
  pdf.setFontSize(11);
  const overviewLines = pdf.splitTextToSize(dietPlan.overview, pageWidth - 40);
  pdf.text(overviewLines, 20, yPosition);
  yPosition += overviewLines.length * 5 + 10;

  // Nutrition Summary
  pdf.setFontSize(16);
  pdf.text('Daily Nutrition Targets', 20, yPosition);
  yPosition += 10;
  
  pdf.setFontSize(11);
  pdf.text(`Daily Calories: ${dietPlan.dailyCalories}`, 20, yPosition);
  yPosition += 6;
  pdf.text(`Protein: ${dietPlan.macroBreakdown.protein}% | Carbs: ${dietPlan.macroBreakdown.carbs}% | Fat: ${dietPlan.macroBreakdown.fat}%`, 20, yPosition);
  yPosition += 15;

  // Weekly Plan
  for (const day of dietPlan.weeklyPlan) {
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(14);
    pdf.setTextColor(16, 185, 129);
    pdf.text(`${day.dayName} - Day ${day.day}`, 20, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Total Calories: ${day.totalCalories}`, 20, yPosition);
    yPosition += 8;

    for (const meal of day.meals) {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(12);
      pdf.setTextColor(59, 130, 246);
      pdf.text(`${meal.type.toUpperCase()}: ${meal.name}`, 25, yPosition);
      yPosition += 6;

      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${meal.calories} calories | Prep: ${meal.prepTime}`, 25, yPosition);
      yPosition += 5;

      const ingredientsText = `Ingredients: ${meal.ingredients.join(', ')}`;
      const ingredientLines = pdf.splitTextToSize(ingredientsText, pageWidth - 50);
      pdf.text(ingredientLines, 25, yPosition);
      yPosition += ingredientLines.length * 4 + 3;
    }
    yPosition += 5;
  }

  // Supplements
  if (yPosition > pageHeight - 60) {
    pdf.addPage();
    yPosition = 20;
  }

  pdf.setFontSize(16);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Recommended Supplements', 20, yPosition);
  yPosition += 10;

  for (const supplement of dietPlan.supplements) {
    pdf.setFontSize(12);
    pdf.setTextColor(249, 115, 22); // Orange color
    pdf.text(supplement.name, 25, yPosition);
    yPosition += 6;

    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Dosage: ${supplement.dosage} | Timing: ${supplement.timing}`, 25, yPosition);
    yPosition += 5;
    
    const purposeLines = pdf.splitTextToSize(`Purpose: ${supplement.purpose}`, pageWidth - 50);
    pdf.text(purposeLines, 25, yPosition);
    yPosition += purposeLines.length * 4 + 5;
  }

  // Lifestyle Recommendations
  if (yPosition > pageHeight - 40) {
    pdf.addPage();
    yPosition = 20;
  }

  pdf.setFontSize(16);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Lifestyle Recommendations', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  for (let i = 0; i < dietPlan.lifestyleRecommendations.length; i++) {
    const recommendation = `${i + 1}. ${dietPlan.lifestyleRecommendations[i]}`;
    const lines = pdf.splitTextToSize(recommendation, pageWidth - 40);
    pdf.text(lines, 25, yPosition);
    yPosition += lines.length * 5 + 3;
  }

  // Disclaimer
  pdf.addPage();
  yPosition = 20;
  pdf.setFontSize(14);
  pdf.setTextColor(220, 38, 38); // Red color
  pdf.text('Important Medical Disclaimer', 20, yPosition);
  yPosition += 15;

  pdf.setFontSize(10);
  pdf.setTextColor(0, 0, 0);
  const disclaimerText = dietPlan.disclaimer || "This nutrition plan is for informational purposes only and is not intended as medical advice. Please consult with a healthcare provider before making significant dietary changes, especially if you have any medical conditions or are taking medications.";
  const disclaimerLines = pdf.splitTextToSize(disclaimerText, pageWidth - 40);
  pdf.text(disclaimerLines, 20, yPosition);

  return pdf.output('blob');
}