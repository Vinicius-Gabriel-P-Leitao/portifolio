import { Octahedron, MeshDistortMaterial, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@ui/components/card/card.component";
import { Modal } from "@ui/components/modal/modal.component";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "./projects.type";

export const ProjectsObject = () => (
  <group position={[0, 5, -10]} rotation={[0, Math.PI, 0]}>
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <group>
        <Octahedron args={[0.9, 0]} position={[-7, 1, 0]}>
          <MeshDistortMaterial
            color="#f59e0b"
            speed={2}
            distort={0.4}
            roughness={0}
            metalness={1}
          />
        </Octahedron>

        <Octahedron args={[1.2, 0]} position={[0, 2, 2]}>
          <MeshDistortMaterial
            color="#fbbf24"
            speed={3}
            distort={0.5}
            roughness={0}
            metalness={1}
          />
        </Octahedron>

        <Octahedron args={[1.0, 0]} position={[7, 1, -1]}>
          <MeshDistortMaterial
            color="#fcd34d"
            speed={2.5}
            distort={0.3}
            roughness={0}
            metalness={1}
          />
        </Octahedron>
      </group>
    </Float>
  </group>
);

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const ProjectsComponent = () => {
  const { t } = useTranslation();

  const projects = useMemo<Project[]>(
    () => t("projects.items", { returnObjects: true }) as Project[],
    [t],
  );

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = selectedProject?.images ?? [];

  const isOpen = selectedProject !== null;

  const handleClose = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    if (!images.length) return;

    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    if (!images.length) return;

    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // preload imagens (evita flicker)
  useEffect(() => {
    images.forEach((img) => {
      const image = new Image();
      image.src = img.url;
    });
  }, [images]);

  return (
    <>
      <motion.div
        key="projects"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4"
      >
        {projects.map((project) => (
          <motion.div key={project.title} variants={itemVariants}>
            <Card.Root
              size="md"
              width="full"
              height="lg"
              onClick={() => {
                if (project.images?.length) {
                  setSelectedProject(project);
                  setCurrentImageIndex(0);
                }
              }}
            >
              <Card.Header>
                <Card.Image src={project.preview || "/assets/gargantua.png"} />
                <Card.Title className="font-display text-purple-glow text-nebula-purple">
                  {project.title}
                </Card.Title>
              </Card.Header>

              <Card.Content className="flex flex-col gap-4">
                <span className="text-slate-300 leading-relaxed font-sans">
                  {project.desc}
                </span>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech) => (
                    <div
                      key={tech}
                      className="px-3 py-1 bg-nebula-purple/10 border border-nebula-purple/20 rounded-full text-[10px] uppercase tracking-tighter text-nebula-violet font-medium"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card.Root>
          </motion.div>
        ))}
      </motion.div>

      <Modal.Root
        isOpen={isOpen}
        onClose={handleClose}
        size="lg"
        position="center"
        className="z-9999"
      >
        <Modal.Header onClose={handleClose}>
          {selectedProject?.title}
        </Modal.Header>

        <Modal.Content className="flex flex-col items-center justify-center relative p-0 overflow-hidden bg-indigo-900/10">
          <AnimatePresence mode="wait">
            {images.length > 0 && (
              <motion.div
                key={`${selectedProject?.title}-${currentImageIndex}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full flex flex-col items-center p-6"
              >
                <span className="text-slate-300 font-medium mb-4 text-center">
                  {images[currentImageIndex].title}
                </span>

                <div className="flex-1 w-full flex items-center justify-center">
                  <img
                    src={images[currentImageIndex].url}
                    alt={images[currentImageIndex].title}
                    className="object-contain max-h-112 rounded-xl shadow-2xl"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-nebula-purple/50 border border-white/10"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-nebula-purple/50 border border-white/10"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </Modal.Content>

        {images.length > 1 && (
          <Modal.Footer className="flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "bg-nebula-purple w-6"
                    : "bg-white/30 hover:bg-white/50 w-2"
                }`}
              />
            ))}
          </Modal.Footer>
        )}
      </Modal.Root>
    </>
  );
};

export default ProjectsComponent;
