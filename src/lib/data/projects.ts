export type ProjectImage = {
	title: string;
	url: string;
};

export type ProjectStatus = 'done' | 'pre-release' | 'in-progress' | 'idea';

export type ProjectHighlight = {
	title: { en: string; 'pt-br': string };
	body: { en: string; 'pt-br': string };
};

export type Project = {
	id: string;
	title: string;
	desc: { en: string; 'pt-br': string };
	tech: string[];
	github?: string;
	demo?: string;
	preview?: string;
	images?: ProjectImage[];
	status: ProjectStatus;
	highlights?: ProjectHighlight[];
};

export const PROJECTS: Project[] = [
	{
		id: 'auth-server',
		title: 'Auth Server',
		status: 'done',
		desc: {
			en: 'Centralized identity management service with an admin panel and a JWT API. Supports refresh tokens via HttpOnly cookies, user lifecycle management, Swagger docs and Actuator metrics.',
			'pt-br':
				'Serviço centralizado de gestão de identidade com painel administrativo e API JWT. Suporta refresh tokens via cookies HttpOnly, ciclo de vida de usuários, Swagger e métricas via Actuator.'
		},
		tech: ['Java', 'Spring Boot', 'Spring Security', 'React', 'TypeScript', 'JWT'],
		github: 'https://github.com/Vinicius-Gabriel-P-Leitao/auth-server',
		preview:
			'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/auth-server/main/docs/auth-panel.png',
		images: [
			{
				title: 'Login',
				url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/auth-server/main/docs/auth-login.png'
			},
			{
				title: 'Metadata',
				url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/auth-server/main/docs/auth-metadata.png'
			},
			{
				title: 'Admin Panel',
				url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/auth-server/main/docs/auth-panel.png'
			}
		],
		highlights: [
			{
				title: { en: 'Token Architecture', 'pt-br': 'Arquitetura de Tokens' },
				body: {
					en: 'Short-lived access JWT paired with a refresh token in an HttpOnly cookie — inaccessible to JavaScript and resistant to XSS attacks.',
					'pt-br':
						'Access JWT de curta duração combinado com refresh token em cookie HttpOnly — invisível para JavaScript e resistente a ataques XSS.'
				}
			},
			{
				title: { en: 'Admin Panel', 'pt-br': 'Painel Administrativo' },
				body: {
					en: 'React frontend for full user lifecycle management: create, activate, suspend and reset passwords, filtered by role.',
					'pt-br':
						'Frontend React para gerenciar o ciclo de vida completo de usuários: criar, ativar, suspender e redefinir senhas, filtrado por cargo.'
				}
			},
			{
				title: { en: 'External Integration', 'pt-br': 'Integração Externa' },
				body: {
					en: 'Any service validates tokens by calling a single endpoint — no shared database, no tight coupling between apps.',
					'pt-br':
						'Qualquer serviço valida tokens chamando um único endpoint — sem banco compartilhado, sem acoplamento entre aplicações.'
				}
			},
			{
				title: { en: 'Observability', 'pt-br': 'Observabilidade' },
				body: {
					en: 'Swagger UI for the full API surface, plus Actuator endpoints for live health checks and system metrics.',
					'pt-br':
						'Swagger UI com toda a superfície da API, mais endpoints do Actuator para health checks e métricas em tempo real.'
				}
			}
		]
	},
	{
		id: 'acerola-android',
		title: 'Acerola Android',
		status: 'pre-release',
		desc: {
			en: 'Android manga reader that scans local folders, reads CBZ and CBR files, auto-fetches metadata from MangaDex and AniList, and supports multiple reading modes and themes.',
			'pt-br':
				'Leitor de mangá para Android que escaneia pastas locais, lê CBZ e CBR, busca metadados automaticamente no MangaDex e AniList, e suporta múltiplos modos de leitura e temas.'
		},
		tech: ['Kotlin', 'Rust', 'Iroh', 'Jetpack Compose', 'Hilt', 'MangaDex API', 'AniList API'],
		github: 'https://github.com/Vinicius-Gabriel-P-Leitao/acerola-android',
		preview:
			'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-android/main/docs/home-screen.png',
		images: [
			{
				title: 'Home',
				url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-android/main/docs/home-screen.png'
			},
			{
				title: 'Manga Settings',
				url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-android/main/docs/config-manga-screen.png'
			},
			{
				title: 'General Settings',
				url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-android/main/docs/config-screen.png'
			},
			{
				title: 'History',
				url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-android/main/docs/history-screen.png'
			},
			{
				title: 'Reader Modes',
				url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-android/main/docs/reader-screen-modes.png'
			},
			{
				title: 'Webtoon',
				url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-android/main/docs/webtom-reader-mode.png'
			},
			{
				title: 'Chapter',
				url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-android/main/docs/chapter-manga-screen.png'
			}
		],
		highlights: [
			{
				title: { en: 'Auto Library', 'pt-br': 'Biblioteca Automática' },
				body: {
					en: 'Points to any storage folder and builds a searchable library automatically — detects new files without manual refresh.',
					'pt-br':
						'Aponta para qualquer pasta e monta uma biblioteca pesquisável automaticamente — detecta novos arquivos sem atualização manual.'
				}
			},
			{
				title: { en: 'Metadata Engine', 'pt-br': 'Motor de Metadados' },
				body: {
					en: 'Fetches cover, synopsis, author and genre from MangaDex, AniList and ComicInfo. Source is switchable per manga and editable manually.',
					'pt-br':
						'Busca capa, sinopse, autor e gênero no MangaDex, AniList e ComicInfo. A fonte é alternável por mangá e editável manualmente.'
				}
			},
			{
				title: { en: 'Format Support', 'pt-br': 'Formatos Suportados' },
				body: {
					en: 'Reads CBZ and CBR natively. PDF files are converted to CBZ automatically on first open — no manual step required.',
					'pt-br':
						'Lê CBZ e CBR nativamente. Arquivos PDF são convertidos para CBZ automaticamente na primeira abertura — sem etapa manual.'
				}
			},
			{
				title: { en: 'Reading Modes', 'pt-br': 'Modos de Leitura' },
				body: {
					en: 'Paginated horizontal/vertical or webtoon continuous scroll. Reading position is saved automatically per chapter.',
					'pt-br':
						'Paginado horizontal/vertical ou scroll contínuo estilo webtoon. A posição de leitura é salva automaticamente por capítulo.'
				}
			},
			{
				title: { en: 'Ecosystem Ready', 'pt-br': 'Ecossistema Integrado' },
				body: {
					en: 'Designed to connect with acerola-desktop over local Wi-Fi and acerola-relay for remote access outside your home network.',
					'pt-br':
						'Projetado para conectar com o acerola-desktop via Wi-Fi local e com o acerola-relay para acesso remoto fora de casa.'
				}
			}
		]
	},
	{
		id: 'acerola-desktop',
		title: 'Acerola Desktop',
		status: 'in-progress',
		desc: {
			en: 'Cross-platform desktop comic reader built with Rust and Tauri. Reads CBZ, CBR and PDF files, manages a local library, streams pages over HTTP to mobile, and connects to the AI translator plugin.',
			'pt-br':
				'Leitor de quadrinhos desktop multiplataforma em Rust e Tauri. Lê CBZ, CBR e PDF, gerencia biblioteca local, faz streaming de páginas via HTTP para celular e conecta ao plugin de tradução com IA.'
		},
		tech: ['Rust', 'Tauri v2', 'Svelte 5', 'TypeScript', 'Iroh', 'Tailwind'],
		github: 'https://github.com/Vinicius-Gabriel-P-Leitao/acerola-desktop',
		highlights: [
			{
				title: { en: 'Native Reader', 'pt-br': 'Leitor Nativo' },
				body: {
					en: 'Rust backend extracts CBZ, CBR and PDF pages with an LRU byte-budget cache — pages stay in memory for smooth back-and-forth navigation.',
					'pt-br':
						'Backend em Rust extrai páginas de CBZ, CBR e PDF com cache LRU por bytes — páginas ficam em memória para navegação fluida em ambas as direções.'
				}
			},
			{
				title: { en: 'Mobile Server', 'pt-br': 'Servidor para Celular' },
				body: {
					en: 'Starts a local Axum HTTP server so the Android app reads your PC library over Wi-Fi without copying a single file.',
					'pt-br':
						'Sobe um servidor HTTP Axum local para o app Android ler a biblioteca do PC via Wi-Fi sem copiar nenhum arquivo.'
				}
			},
			{
				title: { en: 'AI Translation Plugin', 'pt-br': 'Plugin de Tradução com IA' },
				body: {
					en: 'Sends a CBZ to acerola-translator and streams real-time progress back via SSE — translated file downloads automatically when done.',
					'pt-br':
						'Envia um CBZ para o acerola-translator e recebe o progresso em tempo real via SSE — o arquivo traduzido baixa automaticamente ao terminar.'
				}
			},
			{
				title: { en: 'Network Discovery', 'pt-br': 'Descoberta de Rede' },
				body: {
					en: 'mDNS finds the translator and the Android app on the local network automatically — no IP address or manual setup needed.',
					'pt-br':
						'mDNS localiza o translator e o app Android na rede local automaticamente — sem endereço IP ou configuração manual.'
				}
			},
			{
				title: { en: 'Signed Binaries', 'pt-br': 'Binários Assinados' },
				body: {
					en: 'Windows builds signed via SignPath Foundation for open-source GPL3 projects — installs without security warnings.',
					'pt-br':
						'Builds para Windows assinados via SignPath Foundation para projetos GPL3 open-source — instala sem avisos de segurança.'
				}
			}
		]
	},
	{
		id: 'acerola-translater',
		title: 'Acerola Translator',
		status: 'idea',
		desc: {
			en: 'Automatic manga and webtoon translation service. Detects speech balloons, runs OCR, translates via AI (Claude / Ollama / OpenAI), applies inpainting and re-renders the page in Brazilian Portuguese.',
			'pt-br':
				'Serviço de tradução automática de mangás e webtoons. Detecta balões, executa OCR, traduz via IA (Claude / Ollama / OpenAI), aplica inpainting e redesenha a página em português brasileiro.'
		},
		tech: ['Go', 'Python', 'FastAPI', 'OpenCV', 'manga-ocr', 'Svelte 5', 'Docker'],
		github: 'https://github.com/Vinicius-Gabriel-P-Leitao/acerola-translater',
		highlights: [
			{
				title: { en: 'Full Pipeline', 'pt-br': 'Pipeline Completo' },
				body: {
					en: 'Balloon detection → OCR → AI translation → inpainting → re-render, end to end in one job per page.',
					'pt-br':
						'Detecção de balões → OCR → tradução com IA → inpainting → redesenho, fim a fim em um único job por página.'
				}
			},
			{
				title: { en: 'Parallel Processing', 'pt-br': 'Processamento Paralelo' },
				body: {
					en: 'Multiple pages processed simultaneously; live progress streamed to the browser via Server-Sent Events.',
					'pt-br':
						'Múltiplas páginas processadas simultaneamente; progresso transmitido em tempo real ao navegador via Server-Sent Events.'
				}
			},
			{
				title: { en: 'Multi-provider AI', 'pt-br': 'IA Multi-provedor' },
				body: {
					en: 'Claude, OpenAI and Ollama (local model) behind a single interface — swap provider without touching the pipeline code.',
					'pt-br':
						'Claude, OpenAI e Ollama (modelo local) atrás de uma interface única — troca de provedor sem mexer no código do pipeline.'
				}
			},
			{
				title: { en: 'Hybrid Architecture', 'pt-br': 'Arquitetura Híbrida' },
				body: {
					en: 'Go manages HTTP, jobs and SSE. Python runs manga-ocr loaded once in memory — no cold start cost per page.',
					'pt-br':
						'Go gerencia HTTP, jobs e SSE. Python roda manga-ocr carregado uma vez na memória — sem custo de inicialização por página.'
				}
			},
			{
				title: { en: 'One-command Deploy', 'pt-br': 'Deploy com um Comando' },
				body: {
					en: 'Docker Compose bundles Go and Python into a single self-hosted stack — up and running with `docker compose up`.',
					'pt-br':
						'Docker Compose empacota Go e Python em uma stack self-hosted — no ar com `docker compose up`.'
				}
			}
		]
	},
	{
		id: 'acerola-rag',
		title: 'Acerola RAG',
		status: 'done',
		desc: {
			en: 'Retrieval-Augmented Generation system for chatting with your documents. Hybrid vector search, real-time streaming, multi-provider LLM support (OpenAI, Gemini, Claude, Ollama) and an admin panel for document management.',
			'pt-br':
				'Sistema de Retrieval-Augmented Generation para conversar com seus documentos. Busca vetorial híbrida, streaming em tempo real, suporte a múltiplos LLMs (OpenAI, Gemini, Claude, Ollama) e painel administrativo para gerenciar documentos.'
		},
		tech: ['Python', 'FastAPI', 'LlamaIndex', 'Qdrant', 'SvelteKit', 'Svelte 5', 'Tailwind', 'Docker'],
		github: 'https://github.com/Vinicius-Gabriel-P-Leitao/acerola-rag',
		preview:
			'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-rag/main/docs/chat-print.png',
		images: [
			{
				title: 'Chat',
				url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-rag/main/docs/chat-print.png'
			},
			{
				title: 'Admin Panel',
				url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-rag/main/docs/admin-print.png'
			},
			{
				title: 'History',
				url: 'https://raw.githubusercontent.com/Vinicius-Gabriel-P-Leitao/acerola-rag/main/docs/history-print.png'
			}
		],
		highlights: [
			{
				title: { en: 'Hybrid Search', 'pt-br': 'Busca Híbrida' },
				body: {
					en: 'Combines dense vector search with BM25 in Qdrant — retrieves the top-6 most relevant chunks and reranks them contextually before feeding the LLM.',
					'pt-br':
						'Combina busca vetorial densa com BM25 no Qdrant — recupera os 6 chunks mais relevantes e os reordena contextualmente antes de alimentar o LLM.'
				}
			},
			{
				title: { en: 'Multi-provider LLM', 'pt-br': 'LLM Multi-provedor' },
				body: {
					en: 'OpenAI, Gemini, Anthropic and Ollama behind a single interface — swap the provider without touching the pipeline.',
					'pt-br':
						'OpenAI, Gemini, Anthropic e Ollama atrás de uma interface única — troca de provedor sem mexer no pipeline.'
				}
			},
			{
				title: { en: 'Parallel Ingestion', 'pt-br': 'Ingestão Paralela' },
				body: {
					en: '4 workers process documents simultaneously. Chunks of 512 tokens with 64-token overlap using BAAI/bge-small-en-v1.5 embeddings (384 dimensions).',
					'pt-br':
						'4 workers processam documentos simultaneamente. Chunks de 512 tokens com overlap de 64 usando embeddings BAAI/bge-small-en-v1.5 (384 dimensões).'
				}
			},
			{
				title: { en: 'Real-time Streaming', 'pt-br': 'Streaming em Tempo Real' },
				body: {
					en: 'Answers stream progressively to the browser via SSE — no waiting for the full response before reading.',
					'pt-br':
						'Respostas chegam progressivamente ao navegador via SSE — sem esperar a resposta completa para começar a ler.'
				}
			},
			{
				title: { en: 'Smart Parsing', 'pt-br': 'Parsing Inteligente' },
				body: {
					en: 'EasyOCR and Unstructured extract text from scanned PDFs, images and mixed-format documents automatically.',
					'pt-br':
						'EasyOCR e Unstructured extraem texto de PDFs escaneados, imagens e documentos com formatos mistos automaticamente.'
				}
			}
		]
	},
	{
		id: 'acerola-relay',
		title: 'Acerola Relay',
		status: 'idea',
		desc: {
			en: 'Sync and relay server for the Acerola ecosystem. Bridges the desktop client, mobile reader and translator so libraries, reading progress and translated files stay in sync across devices.',
			'pt-br':
				'Servidor de sync e relay do ecossistema Acerola. Conecta o cliente desktop, o leitor mobile e o translator para que bibliotecas, progresso de leitura e arquivos traduzidos fiquem sincronizados entre dispositivos.'
		},
		tech: ['Rust', 'iroh', 'SQLite', 'Docker'],
		highlights: [
			{
				title: { en: 'Peer-to-peer with iroh', 'pt-br': 'Peer-to-peer com iroh' },
				body: {
					en: 'Built on iroh for direct device-to-device connections — no central server required, works through NAT and firewalls automatically.',
					'pt-br':
						'Construído sobre iroh para conexões diretas entre dispositivos — sem servidor central, atravessa NAT e firewalls automaticamente.'
				}
			},
			{
				title: { en: 'Remote Access', 'pt-br': 'Acesso Remoto' },
				body: {
					en: 'Exposes your local library securely without port forwarding, VPN or any router configuration.',
					'pt-br':
						'Expõe sua biblioteca local com segurança sem redirecionamento de porta, VPN ou qualquer configuração de roteador.'
				}
			},
			{
				title: { en: 'Cross-device Sync', 'pt-br': 'Sync Entre Dispositivos' },
				body: {
					en: 'Reading progress, bookmarks and translated files stay consistent between Android and desktop automatically.',
					'pt-br':
						'Progresso de leitura, favoritos e arquivos traduzidos ficam sincronizados entre Android e desktop automaticamente.'
				}
			},
			{
				title: { en: 'Self-hosted', 'pt-br': 'Self-hosted' },
				body: {
					en: 'Lightweight Docker container — runs on any home server, Raspberry Pi or VPS with minimal resources.',
					'pt-br':
						'Container Docker leve — roda em qualquer servidor doméstico, Raspberry Pi ou VPS com recursos mínimos.'
				}
			},
			{
				title: { en: 'Ecosystem Bridge', 'pt-br': 'Ponte do Ecossistema' },
				body: {
					en: 'The missing link that connects acerola-android, acerola-desktop and acerola-translator outside your local network.',
					'pt-br':
						'O elo que conecta acerola-android, acerola-desktop e acerola-translator fora da rede local.'
				}
			}
		]
	}
];
