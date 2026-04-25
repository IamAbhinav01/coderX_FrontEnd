import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/* ─── Problem data ─────────────────────────────────────────────────── */
const problem = {
  id: 'binary-tree-level-order',
  title: 'Binary Tree Level Order Traversal',
  difficulty: 'Medium',
  difficultyColor: '#de1d8d',
  topic: 'Trees',
  description: `Given the <code>root</code> of a binary tree, return the <strong>level order traversal</strong> of its nodes' values (i.e., from left to right, level by level).`,
  examples: [
    {
      id: 'ex-1',
      input: 'root = [3, 9, 20, null, null, 15, 7]',
      output: '[[3], [9, 20], [15, 7]]',
      explanation: 'Three levels: root, then left/right, then their children.',
    },
    {
      id: 'ex-2',
      input: 'root = [1]',
      output: '[[1]]',
      explanation: 'Single node, one level.',
    },
  ],
  constraints: [
    'The number of nodes is in the range [0, 2000].',
    '-1000 ≤ Node.val ≤ 1000',
  ],
  codeSnippets: [
    {
      language: 'Python',
      startSnippet:
        'from collections import deque\nfrom typing import Optional, List\n\n# Definition for a binary tree node.\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nclass Solution:\n    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:',
      midSnippet: '        # Write your logic here\n        pass',
      endSnippet:
        '# Hidden driver code for evaluating python submission\nif __name__ == "__main__":\n    pass',
    },
    {
      language: 'CPP',
      startSnippet:
        '#include <bits/stdc++.h>\nusing namespace std;\n\n// Definition for a binary tree node.\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n\nclass Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {',
      midSnippet: '        // Write your logic here\n        return {};',
      endSnippet:
        '    }\n};\n\nint main() {\n    // Hidden driver code\n    return 0;\n}',
    },
    {
      language: 'Java',
      startSnippet:
        'import java.util.*;\n\n// Definition for a binary tree node.\nclass TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode() {}\n    TreeNode(int val) { this.val = val; }\n    TreeNode(int val, TreeNode left, TreeNode right) {\n        this.val = val;\n        this.left = left;\n        this.right = right;\n    }\n}\n\nclass Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {',
      midSnippet:
        '        // Write your logic here\n        return new ArrayList<>();',
      endSnippet:
        '    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Hidden driver code\n    }\n}',
    },
  ],
};

const langOptions = ['Python', 'CPP', 'Java'];

export default function ProblemSolvingPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('Python');

  const getInitialCode = (language: string) => {
    const snippet = problem.codeSnippets.find((s) => s.language === language);
    return snippet ? snippet.midSnippet : '';
  };

  const [code, setCode] = useState(() => getInitialCode('Python'));

  const [activePanel, setActivePanel] = useState<'console' | 'testcases'>(
    'console'
  );
  const [isRunning, setIsRunning] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setActivePanel('console');
    }, 1500);
  };

  const handleSubmit = async () => {
    try {
      const fullCode = code;

      console.log('Submitting Code:\n', fullCode);
      console.log('Language:', lang);

      const response = await axios.post(
        'http://localhost:3001/api/v1/submissions',
        {
          code: fullCode,
          language: lang,
          userId: '1',
          problemId: '69ec6db19f4c8591447ccc67',
        }
      );
      console.log(response);
      // const response = await axios.post();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-white h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden">
      {/* ── EDITOR HEADER BAR ──────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-2 bg-white flex-shrink-0"
        style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)' }}
      >
        {/* Problem title + difficulty */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="h-5 w-px bg-[#ebebeb] flex-shrink-0"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <h1
              className="font-sans font-semibold text-[#171717] truncate"
              style={{ fontSize: '0.875rem', letterSpacing: '-0.02em' }}
            >
              {problem.title}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className="text-mono-label px-1.5 py-0.5 rounded-micro"
                style={{
                  fontSize: '10px',
                  color: problem.difficultyColor,
                  background: `${problem.difficultyColor}18`,
                }}
              >
                {problem.difficulty}
              </span>
              <span className="text-[#808080]" style={{ fontSize: '11px' }}>
                {problem.topic}
              </span>
            </div>
          </div>
        </div>

        {/* Language selector */}
        <div className="relative">
          <button
            id="lang-selector-btn"
            className="flex items-center gap-1.5 btn-ghost py-1.5 px-3"
            onClick={() => setShowLangMenu(!showLangMenu)}
            aria-haspopup="listbox"
            aria-expanded={showLangMenu}
          >
            <span
              className="material-symbols-outlined text-sm"
              aria-hidden="true"
            >
              code
            </span>
            <span style={{ fontSize: '0.8125rem' }}>{lang}</span>
            <span
              className="material-symbols-outlined text-sm"
              aria-hidden="true"
            >
              expand_more
            </span>
          </button>

          {showLangMenu && (
            <div
              id="lang-dropdown"
              role="listbox"
              className="absolute right-0 top-full mt-1 bg-white rounded-card py-1 z-10 min-w-[130px]"
              style={{
                boxShadow:
                  '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 4px 8px rgba(0,0,0,0.08)',
              }}
            >
              {langOptions.map((l) => (
                <button
                  key={l}
                  role="option"
                  aria-selected={l === lang}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors duration-100 ${
                    l === lang
                      ? 'text-[#171717] font-semibold bg-[#fafafa]'
                      : 'text-[#4d4d4d] hover:bg-[#fafafa] hover:text-[#171717]'
                  }`}
                  onClick={() => {
                    setLang(l);
                    setCode(getInitialCode(l));
                    setShowLangMenu(false);
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── MAIN WORKSPACE ─────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── LEFT PANEL — Problem Statement ──────────────────────── */}
        <section
          className="w-[45%] flex-shrink-0 flex flex-col bg-white overflow-y-auto hide-scrollbar"
          style={{ borderRight: '1px solid #ebebeb' }}
          aria-label="Problem statement"
        >
          {/* Tabs */}
          <div
            className="flex items-center gap-4 px-6 py-2 flex-shrink-0"
            style={{ borderBottom: '1px solid #ebebeb' }}
          >
            {['Description', 'Examples', 'Constraints'].map((tab) => (
              <button
                key={tab}
                className="py-2 text-xs font-medium text-[#666666] hover:text-[#171717] transition-colors duration-150"
                style={{
                  borderBottom:
                    tab === 'Description'
                      ? '2px solid #171717'
                      : '2px solid transparent',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="px-6 py-6 flex flex-col gap-8">
            {/* Description */}
            <div>
              <h2
                className="font-sans font-semibold text-[#171717] mb-3"
                style={{ fontSize: '1rem', letterSpacing: '-0.02em' }}
              >
                Problem Statement
              </h2>
              <p
                className="text-[#4d4d4d]"
                style={{ fontSize: '0.9rem', lineHeight: '1.7' }}
                dangerouslySetInnerHTML={{ __html: problem.description }}
              />
            </div>

            {/* Examples */}
            <div className="flex flex-col gap-4">
              {problem.examples.map(({ id, input, output, explanation }) => (
                <div key={id} id={id}>
                  <h3 className="text-mono-label text-[#808080] mb-2">
                    {id.replace('ex-', 'Example ')}
                  </h3>
                  <div
                    className="rounded-card overflow-hidden"
                    style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08)' }}
                  >
                    <div className="p-4 bg-[#fafafa]">
                      <div className="mb-2">
                        <span className="text-mono-label text-[#808080]">
                          Input:
                        </span>
                        <code
                          className="block font-mono text-[#171717] mt-1"
                          style={{ fontSize: '0.8125rem' }}
                        >
                          {input}
                        </code>
                      </div>
                      <div className="mb-2">
                        <span className="text-mono-label text-[#808080]">
                          Output:
                        </span>
                        <code
                          className="block font-mono text-[#0a72ef] mt-1"
                          style={{ fontSize: '0.8125rem' }}
                        >
                          {output}
                        </code>
                      </div>
                      {explanation && (
                        <div>
                          <span className="text-mono-label text-[#808080]">
                            Explanation:
                          </span>
                          <p
                            className="text-[#4d4d4d] mt-1"
                            style={{ fontSize: '0.8125rem' }}
                          >
                            {explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div>
              <h3 className="text-mono-label text-[#808080] mb-3">
                Constraints
              </h3>
              <ul className="flex flex-col gap-2">
                {problem.constraints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-sm text-[#0a72ef] mt-0.5 flex-shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                      aria-hidden="true"
                    >
                      check_circle
                    </span>
                    <code
                      className="font-mono text-[#4d4d4d]"
                      style={{ fontSize: '0.8125rem', lineHeight: '1.6' }}
                    >
                      {c}
                    </code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── RIGHT PANEL — Code Editor ────────────────────────────── */}
        <section
          className="flex-1 flex flex-col min-w-0 bg-white"
          aria-label="Code editor"
        >
          {/* Editor toolbar */}
          <div
            className="flex items-center justify-between px-4 py-2 bg-[#fafafa] flex-shrink-0"
            style={{ borderBottom: '1px solid #ebebeb' }}
          >
            <div
              className="flex items-center gap-3 text-[#808080]"
              style={{ fontSize: '0.75rem' }}
            >
              <span
                className="material-symbols-outlined text-sm"
                aria-hidden="true"
              >
                history
              </span>
              Auto-saved 2m ago
            </div>
            <div className="flex items-center gap-1">
              <button
                id="editor-settings-btn"
                className="p-1.5 rounded-standard text-[#808080] hover:text-[#171717] hover:bg-[#ebebeb] transition-colors"
                aria-label="Editor settings"
              >
                <span
                  className="material-symbols-outlined text-sm"
                  aria-hidden="true"
                >
                  settings
                </span>
              </button>
              <button
                id="editor-fullscreen-btn"
                className="p-1.5 rounded-standard text-[#808080] hover:text-[#171717] hover:bg-[#ebebeb] transition-colors"
                aria-label="Fullscreen editor"
              >
                <span
                  className="material-symbols-outlined text-sm"
                  aria-hidden="true"
                >
                  fullscreen
                </span>
              </button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language={
                lang === 'Python'
                  ? 'python'
                  : lang === 'C++'
                    ? 'cpp'
                    : lang === 'Java'
                      ? 'java'
                      : 'go'
              }
              value={code}
              onChange={(val) => setCode(val ?? '')}
              theme="vs"
              options={{
                fontSize: 14,
                fontFamily:
                  "'Geist Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace",
                fontLigatures: true,
                lineNumbers: 'on',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                renderLineHighlight: 'line',
                lineHeight: 1.6,
                tabSize: 4,
                wordWrap: 'on',
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
              }}
            />
          </div>

          {/* Console / Test Cases panel */}
          <div
            className="flex-shrink-0 bg-white"
            style={{
              height: '180px',
              borderTop: '1px solid #ebebeb',
            }}
          >
            {/* Tabs */}
            <div
              className="flex items-center px-4 h-10 gap-4 bg-[#fafafa]"
              style={{ borderBottom: '1px solid #ebebeb' }}
            >
              {(['console', 'testcases'] as const).map((panel) => (
                <button
                  key={panel}
                  id={`panel-tab-${panel}`}
                  className="h-full flex items-center gap-1.5 text-xs font-medium transition-colors duration-150"
                  style={{
                    borderBottom:
                      activePanel === panel
                        ? '2px solid #171717'
                        : '2px solid transparent',
                    color: activePanel === panel ? '#171717' : '#808080',
                    textTransform: 'capitalize',
                  }}
                  onClick={() => setActivePanel(panel)}
                >
                  <span
                    className="material-symbols-outlined text-sm"
                    aria-hidden="true"
                  >
                    {panel === 'console' ? 'terminal' : 'rule'}
                  </span>
                  {panel === 'console' ? 'Console' : 'Test Cases'}
                </button>
              ))}

              {isRunning && (
                <span
                  className="ml-auto text-mono-label animate-pulse"
                  style={{ color: '#de1d8d', fontSize: '10px' }}
                >
                  Running…
                </span>
              )}
            </div>

            {/* Panel content */}
            <div
              className="p-4 font-mono overflow-y-auto hide-scrollbar"
              style={{ height: 'calc(180px - 2.5rem)', fontSize: '0.8125rem' }}
            >
              {activePanel === 'console' ? (
                <div className="text-[#808080] flex flex-col gap-1">
                  <p>
                    {'>'} Ready to execute{' '}
                    <span className="text-[#0a72ef]">solution.py</span>…
                  </p>
                  <p>{'>'} Waiting for input…</p>
                  {!isRunning && (
                    <p className="text-[#808080] opacity-60 mt-1">
                      Press "Run Code" to execute against test cases.
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div
                    className="p-3 rounded-standard bg-[#fafafa]"
                    style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.06)' }}
                  >
                    <p className="text-[#808080] mb-1">Input:</p>
                    <code className="text-[#171717]">
                      root = [3, 9, 20, null, null, 15, 7]
                    </code>
                  </div>
                  <div
                    className="p-3 rounded-standard bg-[#fafafa]"
                    style={{ boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.06)' }}
                  >
                    <p className="text-[#808080] mb-1">Expected Output:</p>
                    <code className="text-[#0a72ef]">
                      [[3], [9, 20], [15, 7]]
                    </code>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* ── BOTTOM ACTION BAR ──────────────────────────────────────── */}
      <footer
        className="flex items-center justify-between px-6 h-14 bg-white flex-shrink-0"
        style={{
          boxShadow:
            '0px 0px 0px 1px rgba(0,0,0,0.08), 0px -2px 4px rgba(0,0,0,0.04)',
        }}
      >
        <div className="flex items-center gap-4">
          <button
            id="hint-btn"
            className="flex items-center gap-2 text-[#666666] hover:text-[#171717] transition-colors duration-150"
            style={{ fontSize: '0.8125rem', fontWeight: '500' }}
          >
            <span
              className="material-symbols-outlined text-sm"
              aria-hidden="true"
            >
              lightbulb
            </span>
            Show Hint
          </button>
          <div className="h-4 w-px bg-[#ebebeb]" aria-hidden="true" />
          <div
            className="flex items-center gap-3 font-mono text-[#808080]"
            style={{ fontSize: '0.75rem' }}
          >
            <span>Memory: 0 MB</span>
            <span>Runtime: 0 ms</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="run-code-btn"
            className="btn-ghost py-2 px-5"
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? (
              <>
                <span
                  className="material-symbols-outlined text-sm animate-spin"
                  aria-hidden="true"
                >
                  progress_activity
                </span>
                Running…
              </>
            ) : (
              <>
                <span
                  className="material-symbols-outlined text-sm"
                  aria-hidden="true"
                >
                  play_arrow
                </span>
                Run Code
              </>
            )}
          </button>
          <button
            id="submit-btn"
            className="btn-primary py-2 px-6"
            style={{ background: '#ff5b4f' }}
            onClick={handleSubmit}
          >
            <span
              className="material-symbols-outlined text-sm"
              aria-hidden="true"
            >
              upload
            </span>
            Submit Solution
          </button>
        </div>
      </footer>
    </div>
  );
}
