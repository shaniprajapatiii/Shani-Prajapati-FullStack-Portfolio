/**
 * Updated SkillsSection Component
 * 
 * This is an example of how to convert the hardcoded skills component
 * to use real data from the backend API.
 * 
 * Before: Skills were hardcoded
 * After: Skills fetched from /api/skills endpoint
 */

import { useSkills } from '@/hooks/useApi';
import { Card, CardContent } from '@/components/ui/card';

interface SkillProps {
  name: string;
  icon: string;
  color: string;
  category: string;
}

interface SkillCategoryProps {
  category: string;
  skills: SkillProps[];
}

const SkillCategory = ({ category, skills }: SkillCategoryProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gradient">{category}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <Card
            key={skill.name}
            className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-purple-200/20 bg-gradient-to-br from-purple-900/10 to-transparent"
          >
            <CardContent className="p-4 flex flex-col items-center justify-center h-full">
              <div className="text-4xl mb-2">{skill.icon}</div>
              <div className="text-center">
                <p className="font-medium text-sm" style={{ color: skill.color }}>
                  {skill.name}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const SkillsSection = () => {
  const { data: skills, loading, error } = useSkills();

  if (loading) {
    return (
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">
            <span className="text-gradient">Skills & Technologies</span>
          </h2>
          <div className="animate-pulse">Loading skills...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">
            <span className="text-gradient">Skills & Technologies</span>
          </h2>
          <div className="text-red-500">Error loading skills. Please try again later.</div>
        </div>
      </section>
    );
  }

  // Group skills by category
  const groupedSkills = skills?.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push({
        name: skill.name,
        icon: skill.icon,
        color: skill.color,
        category: skill.category,
      });
      return acc;
    },
    {} as Record<string, SkillProps[]>
  );

  // Define category order for consistent display
  const categoryOrder = ['Frontend', 'Backend', 'Database', 'Tools', 'Other'];
  const sortedCategories = categoryOrder.filter((cat) => groupedSkills?.[cat]);

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-gradient">Skills & Technologies</span>
        </h2>
        <p className="text-gray-400 mb-12 text-lg">
          A diverse toolkit spanning across frontend, backend, databases, and DevOps
        </p>

        {sortedCategories.map((category) => (
          <SkillCategory
            key={category}
            category={category}
            skills={groupedSkills?.[category] || []}
          />
        ))}

        {(!skills || skills.length === 0) && (
          <div className="text-center text-gray-400 py-12">
            No skills available. Please add some skills in the admin panel.
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;

/**
 * Migration Checklist:
 * 
 * ✅ Replace hardcoded skills array with useSkills() hook
 * ✅ Handle loading state with spinner
 * ✅ Handle error state with fallback UI
 * ✅ Group skills by category from API data
 * ✅ Display skill icon (Unicode emoji) from API
 * ✅ Apply color styling from API data
 * ✅ Sort categories in preferred order
 * ✅ Maintain existing styling and layout
 * 
 * To implement in your project:
 * 1. Replace the hardcoded skills data with useSkills()
 * 2. Update imports if your component structure differs
 * 3. Test with backend API running
 * 4. Adjust styling to match your design system
 */
