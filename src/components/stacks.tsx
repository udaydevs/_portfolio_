import { useTheme } from "next-themes"

const stacks = [
  { name: "javascript", title: "JavaScript" },
  { name: "java", title: "Java" },
  { name: "react", title: "React" },
  { name: "nextjs", title: "Next.js" },
  { name: "nodejs", title: "Node.js" },
  { name: "git", title: "Git" },
  { name: "python", title: "Python" },
  { name: "react", title: "shadcn/ui" },
  { name: "typescript", title: "TypeScript" },
  { name: "docker" },
  { name: "fastapi" },
  { name: "mongodb" },
  { name: "postgres" },
  { name: "postman" },
  { name: "vercel" },

];

export default function Stacks() {
  const { theme } = useTheme()
  const currenttheme = theme === 'dark' ? 'dark' : 'light'
  return (
    <div className="flex w-full flex-row flex-wrap justify-center gap-2 sm:gap-3 mt-5 mb-10">
      {stacks.map((stack, index) => (
        <div
          key={index}
          title={stack.title}
          className="flex items-center justify-center
                     border border-gray-600
                     h-14 w-14 rounded-full shadow-2xl
                     cursor-zoom-in hover:scale-110
                     transition-transform duration-300 ease-in-out"
        >
          <img
            src={`https://skillicons.dev/icons?i=${stack.name}&theme=${currenttheme}`}
            className="h-8 w-8 pointer-events-none"
          />
        </div>
      ))}
    </div>
  );
}
