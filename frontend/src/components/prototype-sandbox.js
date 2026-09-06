// ─── Interactive Prototype Sandboxes & Design Gallery ───

/**
 * Mounts the appropriate interactive prototype into the canvas container
 */
export function mountPrototype(project, canvasEl, onToast) {
  if (!canvasEl) return

  switch (project.prototypeType) {
    case 'speechToText':
      mountSpeechToText(project, canvasEl, onToast)
      break
    case 'campusMap':
      mountCampusMap(project, canvasEl, onToast)
      break
    case 'leafScan':
      mountLeafScan(project, canvasEl, onToast)
      break
    case 'canteenQueue':
      mountCanteenQueue(project, canvasEl, onToast)
      break
    case 'gamifiedPet':
      mountGamifiedPet(project, canvasEl, onToast)
      break
    case 'peerChat':
      mountPeerChat(project, canvasEl, onToast)
      break
    default:
      mountSpeechToText(project, canvasEl, onToast)
  }
}

// ─────────────────────────────────────────────────────────────
// 1. EchoLearn — Speech to Text & Lecture Summary AI
// ─────────────────────────────────────────────────────────────
function mountSpeechToText(project, canvas, showToast) {
  const sampleAudios = [
    {
      id: 'ds-tree',
      title: 'เลคเชอร์ 1: Data Structures & Binary Search Trees (CS201)',
      duration: '0:45',
      transcript: [
        { time: '00:02', text: 'สวัสดีครับทุกคน วันนี้ในวิชา Data Structures เราจะมาดูโครงสร้างข้อมูลแบบ Binary Search Tree (BST)' },
        { time: '00:11', text: 'คุณสมบัติสำคัญของ BST คือ โหนดทางซ้ายต้องมีค่าน้อยกว่า Root เสมอ และโหนดทางขวาต้องมีค่ามากกว่า' },
        { time: '00:23', text: 'เวลาที่เราทำ Search, Insert หรือ Delete ค่าเฉลี่ย Time Complexity จะอยู่ที่ O(log n)' },
        { time: '00:34', text: 'แต่จุดสำคัญที่ต้องระวังเวลาสอบ คือถ้าข้อมูลเรียงลำดับมาอยู่แล้ว ต้นไม้จะเบ้ข้าง (Skewed Tree) จนกลายเป็น O(n)' },
        { time: '00:41', text: 'ดังนั้นจึงต้องมี Self-balancing Tree เช่น AVL หรือ Red-Black Tree เข้ามาช่วยครับ' },
      ],
      summaryPoints: [
        'Binary Search Tree (BST): กฎสำคัญคือ Left Subtree < Root < Right Subtree เสมอ',
        'Time Complexity: ค่าเฉลี่ยการค้นหา แทรก และลบ คือ O(log n) ในโครงสร้างสมดุล',
        'ข้อควรระวังในการสอบ: กรณี Unbalanced (ข้อมูลเรียงลำดับมาแล้ว) จะกลายเป็น Skewed Tree ความเร็วตกลงเหลือ O(n)',
        'แนวทางแก้ไข: ใช้ Self-balancing Binary Search Trees เช่น AVL Tree หรือ Red-Black Tree',
      ],
      flashcards: [
        {
          q: 'คุณสมบัติพื้นฐานของโหนดซ้ายและขวาใน Binary Search Tree (BST) คืออะไร?',
          a: 'โหนดใน Left Subtree ทุกตัวต้องมีค่าน้อยกว่า Root และโหนดใน Right Subtree ทุกตัวต้องมีค่ามากกว่า Root เสมอ',
        },
        {
          q: 'Worst-case Time Complexity ของการค้นหาใน Unbalanced BST คือเท่าใด และเกิดจากอะไร?',
          a: 'O(n) เกิดขึ้นเมื่อใส่ข้อมูลที่เรียงลำดับมาแล้ว ทำให้โครงสร้างต้นไม้กลายเป็นเส้นตรงเหมือน Linked List (Skewed Tree)',
        },
        {
          q: 'เทคนิคหรือโครงสร้างข้อมูลใดที่ใช้แก้ปัญหา Skewed BST เพื่อรักษา O(log n)?',
          a: 'Self-Balancing Binary Search Tree เช่น AVL Tree หรือ Red-Black Tree ซึ่งทำการ Tree Rotation เมื่อโครงสร้างเสียสมดุล',
        },
      ],
    },
    {
      id: 'bio-dna',
      title: 'เลคเชอร์ 2: เซลล์ชีววิทยา & การจำลองตัวเองของ DNA (BIO102)',
      duration: '0:38',
      transcript: [
        { time: '00:02', text: 'หัวข้อถัดมาคือเรื่อง DNA Replication หรือการจำลองตัวเองของสารพันธุกรรม' },
        { time: '00:09', text: 'กระบวนการนี้เกิดขึ้นในระยะ S-phase ของ Interphase ก่อนที่เซลล์จะเริ่มการแบ่งตัว' },
        { time: '00:18', text: 'เอนไซม์หลักที่ทำหน้าที่คลายเกลียวคือ DNA Helicase ส่วนตัวสังเคราะห์สายใหม่คือ DNA Polymerase' },
        { time: '00:28', text: 'การสังเคราะห์สายใหม่จะเกิดขึ้นในทิศทาง 5\' ไป 3\' เสมอ ทำให้เกิดสาย Leading และ Lagging strand' },
        { time: '00:35', text: 'ตรงจุดนี้ข้อสอบชอบถามความแตกต่างของเอนไซม์แต่ละตัว ขอให้นักศึกษาทบทวนให้แม่นนะครับ' },
      ],
      summaryPoints: [
        'DNA Replication เกิดขึ้นในระยะ S-phase (Synthesis phase) ของ Interphase',
        'เอนไซม์สำคัญ: DNA Helicase (คลายเกลียวแยกสาย) และ DNA Polymerase (สร้างสาย DNA ใหม่)',
        'ทิศทางการสังเคราะห์: ดำเนินจาก 5\' ไปยัง 3\' (5-prime to 3-prime) เสมอ',
        'สาย Leading Strand สังเคราะห์ต่อเนื่อง ส่วน Lagging Strand สร้างเป็นชิ้นส่วนสั้นๆ (Okazaki Fragments)',
      ],
      flashcards: [
        {
          q: 'เอนไซม์ใดทำหน้าที่สลายพันธะไฮโดรเจนเพื่อคลายเกลียวคู่เบสของ DNA?',
          a: 'DNA Helicase ทำหน้าที่คลายเกลียวคู่เบสของโมเลกุล DNA ให้แยกออกจากกันเพื่อเป็นแม่แบบ',
        },
        {
          q: 'DNA Polymerase สามารถสังเคราะห์สาย DNA ใหม่ได้ในทิศทางใดเท่านั้น?',
          a: 'ทิศทาง 5\' ไปยัง 3\' (5-prime to 3-prime) เสมอ',
        },
        {
          q: 'DNA Replication เกิดขึ้นในระยะใดของวัฏจักรเซลล์?',
          a: 'ระยะ S-phase (Synthesis Phase) ในช่วง Interphase ก่อนเข้าสู่กระบวนการ Mitosis หรือ Meiosis',
        },
      ],
    },
    {
      id: 'law-contract',
      title: 'เลคเชอร์ 3: กฎหมายแพ่งและพาณิชย์ — นิติกรรมและสัญญา (LAW201)',
      duration: '0:32',
      transcript: [
        { time: '00:02', text: 'หลักสำคัญของนิติกรรมตามประมวลกฎหมายแพ่ง มาตรา 149 คือการกระทำที่ชอบด้วยกฎหมาย' },
        { time: '00:10', text: 'และการกระทำนั้นต้องมุ่งโดยตรงต่อการผูกนิติสัมพันธ์ขึ้นระหว่างบุคคล' },
        { time: '00:20', text: 'หากทำขึ้นโดยสำคัญผิดในสิ่งซึ่งเป็นสาระสำคัญแห่งนิติกรรม ผลคือนิติกรรมนั้นจะตกเป็นโมฆะทันที' },
        { time: '00:28', text: 'แต่ถ้าสำคัญผิดในคุณสมบัติของบุคคลหรือทรัพย์ ผลจะตกเป็นเพียงโมฆียะ จำจุดนี้ไว้ให้ดีครับ' },
      ],
      summaryPoints: [
        'นิติกรรม (ป.พ.พ. ม.149): การกระทำของบุคคลโดยชอบด้วยกฎหมายและด้วยใจสมัคร มุ่งผูกนิติสัมพันธ์',
        'สำคัญผิดในสิ่งซึ่งเป็นสาระสำคัญแห่งนิติกรรม (ม.156) -> ผลคือ "ตกเป็นโมฆะ"',
        'สำคัญผิดในคุณสมบัติของบุคคลหรือทรัพย์ (ม.157) -> ผลคือ "ตกเป็นโมฆียะ" (บอกล้างหรือให้สัตยาบันได้)',
      ],
      flashcards: [
        {
          q: 'การสำคัญผิดในสิ่งซึ่งเป็นสาระสำคัญแห่งนิติกรรมส่งผลอย่างไร?',
          a: 'นิติกรรมตกเป็น "โมฆะ" (ถือว่าเสียเปล่ามาแต่แรก ไม่มีผลผูกพันตามกฎหมาย)',
        },
        {
          q: 'การสำคัญผิดในคุณสมบัติของบุคคลหรือทรัพย์สินส่งผลอย่างไร?',
          a: 'นิติกรรมตกเป็น "โมฆียะ" ซึ่งมีผลสมบูรณ์จนกว่าจะถูกบอกล้างตามกฎหมาย',
        },
      ],
    },
  ]

  let currentSampleIndex = 0
  let isPlaying = false
  let isTranscribed = false
  let isProcessing = false
  let activeTab = 'transcript'
  let currentCardIndex = 0
  let isFlipped = false
  let audioSrcUrl = null
  let uploadedFileName = ''

  function getActiveSample() {
    return sampleAudios[currentSampleIndex]
  }

  function render() {
    const sample = getActiveSample()

    canvas.innerHTML = `
      <div class="space-y-5">
        <!-- Audio Input Selector Bar -->
        <div class="bg-white rounded-2xl p-4 sm:p-5 border border-purple-100 shadow-sm space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span class="text-xs font-bold text-purple-700 uppercase tracking-wide">🎙️ ระบบบันทึกและแปลงเสียงเลคเชอร์ (EchoLearn Speech Core)</span>
              <h3 class="text-base font-bold text-gray-900 mt-0.5">เลือกเสียงหรืออัปโหลดไฟล์เสียงจริงเพื่อทดสอบถอดความ</h3>
            </div>
            <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Whisper Thai v2 พร้อมใช้งาน
            </span>
          </div>

          <!-- Selection Controls -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
            <!-- Dropdown / Sample audio picker -->
            <div class="md:col-span-7">
              <label class="block text-xs font-semibold text-gray-600 mb-1.5">🎧 เลือกคลิปเสียงเลคเชอร์ตัวอย่าง:</label>
              <select id="protoSampleSelect" class="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:bg-white focus:border-[#6d5dfb] outline-none">
                ${sampleAudios.map((s, idx) => `<option value="${idx}" ${idx === currentSampleIndex ? 'selected' : ''}>${s.title} (${s.duration})</option>`).join('')}
              </select>
            </div>

            <!-- Upload Real Audio File Button -->
            <div class="md:col-span-5 flex flex-col justify-end">
              <label class="block text-xs font-semibold text-gray-600 mb-1.5">📁 หรือใส่ไฟล์เสียงจริงของคุณ:</label>
              <label class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border-2 border-dashed border-[#6d5dfb]/40 hover:border-[#6d5dfb] bg-purple-50/40 hover:bg-purple-50 text-xs font-bold text-[#6d5dfb] cursor-pointer transition-all">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                <span id="uploadLabelText">${uploadedFileName ? 'เปลี่ยนไฟล์: ' + uploadedFileName : 'อัปโหลดไฟล์เสียง (.mp3, .wav, .m4a)'}</span>
                <input type="file" id="protoAudioFileInput" accept="audio/*" class="hidden">
              </label>
            </div>
          </div>

          <!-- Custom Audio Player Bar -->
          <div class="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#17152b] via-[#221f42] to-[#2d1b4e] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div class="flex items-center gap-3 w-full sm:w-auto">
              <button type="button" id="protoPlayBtn" class="w-11 h-11 rounded-full bg-[#6d5dfb] hover:bg-[#5b4be0] text-white grid place-items-center text-lg transition-transform hover:scale-105 shrink-0 shadow-md">
                ${isPlaying ? '⏸' : '▶'}
              </button>
              <div class="min-w-0">
                <span class="text-xs font-bold text-white block truncate">${uploadedFileName ? 'ไฟล์ที่คุณอัปโหลด: ' + uploadedFileName : sample.title}</span>
                <span class="text-[11px] text-purple-200" id="protoTimeText">${isPlaying ? 'กำลังเล่นเสียง...' : 'กดเพื่อฟังเสียงบรรยาย'} · ${sample.duration}</span>
              </div>
            </div>

            <!-- Animated Waveform Equalizer -->
            <div class="flex items-center gap-1 h-8 px-3 py-1 bg-black/30 rounded-lg backdrop-blur-sm" title="Waveform Audio Stream">
              ${[12, 24, 16, 28, 8, 22, 30, 18, 14, 26, 20, 10, 25, 15, 22, 16]
                .map(
                  (h, i) => `
                <div class="w-1 bg-gradient-to-t from-purple-400 to-pink-300 rounded-full transition-all duration-150 ${isPlaying ? 'wave-bar' : ''}" style="height: ${isPlaying ? h : 6}px; animation-delay: ${i * 0.08}s;"></div>
              `,
                )
                .join('')}
            </div>

            <!-- Action Button -->
            <button type="button" id="protoTranscribeBtn" ${isProcessing ? 'disabled' : ''} class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg hover:scale-102">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <span>${isProcessing ? 'กำลังประมวลผล...' : isTranscribed ? '⚡ แปลงเสียงซ้ำ' : '⚡ ถอดความ & สร้างชีทสรุป'}</span>
            </button>
          </div>

          <!-- Hidden Native Audio Element -->
          <audio id="protoNativeAudio" class="hidden"></audio>
        </div>

        <!-- Processing Progress indicator -->
        ${
          isProcessing
            ? `
          <div class="p-6 rounded-2xl bg-white border border-purple-200 text-center space-y-3 animate-pulse">
            <div class="w-12 h-12 mx-auto rounded-2xl bg-purple-100 text-[#6d5dfb] grid place-items-center text-2xl">
              ⚙️
            </div>
            <div>
              <h4 class="text-sm font-bold text-gray-900" id="protoProcessStep">กำลังวิเคราะห์คลื่นเสียงและตัดเสียงรบกวน...</h4>
              <p class="text-xs text-gray-500 mt-1">โมเดล AI กำลังถอดสำเนียงภาษาไทยและจัดหมวดหมู่ประเด็นออกสอบ</p>
            </div>
            <div class="w-full max-w-md mx-auto bg-gray-100 rounded-full h-2 overflow-hidden">
              <div class="bg-gradient-to-r from-[#6d5dfb] to-pink-500 h-2 rounded-full w-3/4 animate-[pulse_1s_infinite]"></div>
            </div>
          </div>
        `
            : ''
        }

        <!-- Results View (Transcribed) -->
        ${
          isTranscribed && !isProcessing
            ? `
          <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <!-- Sub tabs -->
            <div class="flex items-center gap-2 border-b border-gray-100 px-4 sm:px-6 pt-3 bg-gray-50/50">
              <button type="button" class="proto-subtab px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all ${activeTab === 'transcript' ? 'border-[#6d5dfb] text-[#6d5dfb] bg-white rounded-t-lg' : 'border-transparent text-gray-500 hover:text-gray-800'}" data-tab="transcript">
                📝 ข้อความที่ถอดได้ (Transcript)
              </button>
              <button type="button" class="proto-subtab px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all ${activeTab === 'summary' ? 'border-[#6d5dfb] text-[#6d5dfb] bg-white rounded-t-lg' : 'border-transparent text-gray-500 hover:text-gray-800'}" data-tab="summary">
                📑 ชีทสรุปอัจฉริยะ (AI Summary)
              </button>
              <button type="button" class="proto-subtab px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all ${activeTab === 'flashcards' ? 'border-[#6d5dfb] text-[#6d5dfb] bg-white rounded-t-lg' : 'border-transparent text-gray-500 hover:text-gray-800'}" data-tab="flashcards">
                📇 Flashcards ทบทวนสอบ (${sample.flashcards.length})
              </button>
            </div>

            <div class="p-4 sm:p-6">
              <!-- Tab 1: Transcript -->
              <div id="protoContentTranscript" class="${activeTab === 'transcript' ? 'block' : 'hidden'} space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span class="text-xs text-gray-500">ผลการถอดข้อความแบบเรียลไทม์ พร้อมระบุช่วงเวลา (Timestamps):</span>
                  <button type="button" id="copyTranscriptBtn" class="text-xs font-semibold text-[#6d5dfb] hover:text-[#5b4be0] inline-flex items-center gap-1">
                    📋 คัดลอกทั้งหมด
                  </button>
                </div>
                <div class="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  ${sample.transcript
                    .map(
                      (item) => `
                    <div class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-purple-50/50 transition-colors border border-transparent hover:border-purple-100">
                      <span class="px-2 py-0.5 rounded-md bg-purple-100 text-[#6d5dfb] text-[11px] font-mono font-bold shrink-0 mt-0.5">
                        ${item.time}
                      </span>
                      <p class="text-xs sm:text-sm text-gray-800 leading-relaxed">${item.text}</p>
                    </div>
                  `,
                    )
                    .join('')}
                </div>
              </div>

              <!-- Tab 2: AI Summary -->
              <div id="protoContentSummary" class="${activeTab === 'summary' ? 'block' : 'hidden'} space-y-4">
                <div class="flex items-center justify-between pb-2 border-b border-gray-100">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">✨ AI Generated Note</span>
                    <span class="text-xs text-gray-500">สร้างจากเสียงบรรยายโดยอัตโนมัติ</span>
                  </div>
                  <button type="button" id="copySummaryBtn" class="text-xs font-semibold text-[#6d5dfb] hover:text-[#5b4be0] inline-flex items-center gap-1">
                    📋 บันทึกชีทสรุป
                  </button>
                </div>

                <div class="p-4 rounded-xl bg-purple-50/60 border border-purple-100 space-y-2.5">
                  <h5 class="text-xs font-bold text-[#6d5dfb] uppercase tracking-wide">📌 สรุปใจความสำคัญของหัวข้อนี้:</h5>
                  <ul class="space-y-2">
                    ${sample.summaryPoints
                      .map(
                        (pt) => `
                      <li class="flex items-start gap-2 text-xs sm:text-sm text-gray-800">
                        <span class="text-[#6d5dfb] font-bold mt-0.5">•</span>
                        <span>${pt}</span>
                      </li>
                    `,
                      )
                      .join('')}
                  </ul>
                </div>

                <div class="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                  <span class="text-base shrink-0">💡</span>
                  <div>
                    <strong class="font-bold">ไฮไลต์จุดที่ต้องระวัง:</strong> อาจารย์เน้นย้ำเรื่องความแตกต่างของกรณี Worst-case และเงื่อนไขการนำไปใช้ ขอให้อ่านทบทวนในชีทเพิ่มเติม!
                  </div>
                </div>
              </div>

              <!-- Tab 3: Interactive Flashcards -->
              <div id="protoContentFlashcards" class="${activeTab === 'flashcards' ? 'block' : 'hidden'} space-y-4">
                <div class="flex items-center justify-between pb-1">
                  <span class="text-xs text-gray-500">คลิกที่การ์ดเพื่อพลิกดูคำตอบ (3D Interactive Flashcard):</span>
                  <span class="text-xs font-bold text-[#6d5dfb]" id="protoCardCounter">การ์ดที่ ${currentCardIndex + 1} จาก ${sample.flashcards.length}</span>
                </div>

                <!-- 3D Flashcard Container -->
                <div class="perspective-[1000px] w-full cursor-pointer" id="protoFlashcardWrapper">
                  <div id="protoFlashcard" class="flashcard-inner relative w-full h-52 sm:h-56 rounded-2xl shadow-sm border border-purple-200 ${isFlipped ? 'is-flipped' : ''}">
                    <!-- Front (Question) -->
                    <div class="flashcard-front absolute inset-0 p-6 rounded-2xl bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/40 flex flex-col justify-between border border-purple-100">
                      <div class="flex items-center justify-between">
                        <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#6d5dfb] text-white">คำถาม (Question)</span>
                        <span class="text-[11px] text-gray-400">คลิกเพื่อดูเฉลย 🔄</span>
                      </div>
                      <p class="text-sm sm:text-base font-bold text-gray-800 text-center my-auto px-4">
                        ${sample.flashcards[currentCardIndex].q}
                      </p>
                      <span class="text-[11px] text-center text-purple-600 font-semibold">แตะเพื่อพลิกการ์ด →</span>
                    </div>

                    <!-- Back (Answer) -->
                    <div class="flashcard-back absolute inset-0 p-6 rounded-2xl bg-gradient-to-br from-[#251763] to-[#4d3db2] text-white flex flex-col justify-between border border-purple-400">
                      <div class="flex items-center justify-between">
                        <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500 text-white">เฉลย (Answer)</span>
                        <span class="text-[11px] text-purple-200">คลิกเพื่อดูคำถาม 🔄</span>
                      </div>
                      <p class="text-xs sm:text-sm text-white/95 text-center my-auto px-4 leading-relaxed">
                        ${sample.flashcards[currentCardIndex].a}
                      </p>
                      <span class="text-[11px] text-center text-purple-300 font-semibold">← แตะเพื่อกลับไปคำถาม</span>
                    </div>
                  </div>
                </div>

                <!-- Flashcard Controls -->
                <div class="flex items-center justify-between pt-2">
                  <button type="button" id="prevCardBtn" ${currentCardIndex === 0 ? 'disabled' : ''} class="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors">
                    ← การ์ดก่อนหน้า
                  </button>
                  <div class="flex items-center gap-1.5">
                    <button type="button" id="cardMarkLearned" class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-colors">
                      ✓ จำได้แล้ว
                    </button>
                  </div>
                  <button type="button" id="nextCardBtn" ${currentCardIndex === sample.flashcards.length - 1 ? 'disabled' : ''} class="px-4 py-2 rounded-xl bg-[#6d5dfb] text-white text-xs font-semibold hover:bg-[#5b4be0] disabled:opacity-40 disabled:hover:bg-[#6d5dfb] transition-colors">
                    การ์ดถัดไป →
                  </button>
                </div>
              </div>
            </div>
          </div>
        `
            : ''
        }
      </div>
    `

    attachEvents()
  }

  function attachEvents() {
    const sampleSelect = canvas.querySelector('#protoSampleSelect')
    const fileInput = canvas.querySelector('#protoAudioFileInput')
    const playBtn = canvas.querySelector('#protoPlayBtn')
    const transcribeBtn = canvas.querySelector('#protoTranscribeBtn')
    const audioEl = canvas.querySelector('#protoNativeAudio')

    // Sample select change
    sampleSelect?.addEventListener('change', (e) => {
      currentSampleIndex = parseInt(e.target.value, 10)
      uploadedFileName = ''
      isPlaying = false
      isTranscribed = false
      isFlipped = false
      currentCardIndex = 0
      render()
    })

    // Real audio file upload
    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files?.[0]
      if (file) {
        uploadedFileName = file.name
        audioSrcUrl = URL.createObjectURL(file)
        if (audioEl) {
          audioEl.src = audioSrcUrl
        }
        isPlaying = false
        isTranscribed = false
        isFlipped = false
        currentCardIndex = 0
        showToast?.(`โหลดไฟล์ "${file.name}" พร้อมสำหรับถอดความแล้ว! 🎵`)
        render()
      }
    })

    // Play/Pause button
    playBtn?.addEventListener('click', () => {
      isPlaying = !isPlaying
      if (audioEl && audioSrcUrl) {
        if (isPlaying) {
          audioEl.play().catch(() => {})
        } else {
          audioEl.pause()
        }
      } else {
        // Simulated audio playback with auto stop after 6 seconds if no real file
        if (isPlaying) {
          playSyntheticTone()
          setTimeout(() => {
            if (isPlaying) {
              isPlaying = false
              render()
            }
          }, 8000)
        }
      }
      render()
    })

    // Transcribe button
    transcribeBtn?.addEventListener('click', () => {
      isProcessing = true
      render()

      // Simulation steps
      setTimeout(() => {
        const stepEl = canvas.querySelector('#protoProcessStep')
        if (stepEl) stepEl.textContent = 'โมเดล Whisper กำลังแปลงเสียงภาษาไทยเป็นข้อความ...'
      }, 700)

      setTimeout(() => {
        const stepEl = canvas.querySelector('#protoProcessStep')
        if (stepEl) stepEl.textContent = 'กำลังสกัดใจความสำคัญและสร้าง Flashcards สำหรับทบทวน...'
      }, 1400)

      setTimeout(() => {
        isProcessing = false
        isTranscribed = true
        activeTab = 'transcript'
        showToast?.('ถอดความและสร้างชีทสรุปเลคเชอร์สำเร็จแล้ว! ✨')
        render()
      }, 2100)
    })

    // Sub tabs
    canvas.querySelectorAll('.proto-subtab').forEach((tabBtn) => {
      tabBtn.addEventListener('click', () => {
        activeTab = tabBtn.getAttribute('data-tab')
        render()
      })
    })

    // Copy buttons
    canvas.querySelector('#copyTranscriptBtn')?.addEventListener('click', () => {
      const text = getActiveSample()
        .transcript.map((t) => `[${t.time}] ${t.text}`)
        .join('\n')
      navigator.clipboard?.writeText(text)
      showToast?.('คัดลอกบันทึกถอดความทั้งหมดเรียบร้อยแล้ว! 📋')
    })

    canvas.querySelector('#copySummaryBtn')?.addEventListener('click', () => {
      const text = getActiveSample().summaryPoints.join('\n• ')
      navigator.clipboard?.writeText('สรุปเลคเชอร์:\n• ' + text)
      showToast?.('คัดลอกชีทสรุปเลคเชอร์เรียบร้อยแล้ว! 📑')
    })

    // 3D Flashcard Flip
    const flashcardWrapper = canvas.querySelector('#protoFlashcardWrapper')
    flashcardWrapper?.addEventListener('click', () => {
      isFlipped = !isFlipped
      const card = canvas.querySelector('#protoFlashcard')
      if (card) {
        if (isFlipped) card.classList.add('is-flipped')
        else card.classList.remove('is-flipped')
      }
    })

    // Flashcard navigation
    canvas.querySelector('#prevCardBtn')?.addEventListener('click', (e) => {
      e.stopPropagation()
      if (currentCardIndex > 0) {
        currentCardIndex--
        isFlipped = false
        render()
      }
    })

    canvas.querySelector('#nextCardBtn')?.addEventListener('click', (e) => {
      e.stopPropagation()
      if (currentCardIndex < getActiveSample().flashcards.length - 1) {
        currentCardIndex++
        isFlipped = false
        render()
      }
    })

    canvas.querySelector('#cardMarkLearned')?.addEventListener('click', (e) => {
      e.stopPropagation()
      showToast?.('เก่งมาก! บันทึกความจำการ์ดนี้เรียบร้อยแล้ว 🎉')
    })
  }

  // Play a quick web audio chime to make play interactive even without uploaded file
  function playSyntheticTone() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(440, ctx.currentTime)
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.6)
    } catch {}
  }

  render()
}

// ─────────────────────────────────────────────────────────────
// 2. SafeWalk MFU — Smart Campus Safety Map Prototype
// ─────────────────────────────────────────────────────────────
function mountCampusMap(project, canvas, showToast) {
  let activeRoute = 'safewalk'
  let isSosActive = false
  let companionSharing = true
  let reportedHazards = [
    { id: 1, title: 'จุดไฟทางดับ เสาที่ 14', x: '42%', y: '68%', type: 'light' },
    { id: 2, title: 'ทางเปลี่ยว/มุมอับสายตา', x: '65%', y: '35%', type: 'blind' },
  ]

  function render() {
    canvas.innerHTML = `
      <div class="space-y-4">
        <!-- Controls Bar -->
        <div class="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-gray-700">เลือกโหมดเส้นทาง:</span>
            <div class="inline-flex p-1 bg-gray-100 rounded-xl">
              <button type="button" id="routeSafeBtn" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeRoute === 'safewalk' ? 'bg-[#6d5dfb] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}">
                🛡️ SafeWalk (สว่าง 100%)
              </button>
              <button type="button" id="routeNormalBtn" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeRoute === 'normal' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}">
                ⚠️ ทางลัดปกติ (มีจุดเปลี่ยว)
              </button>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button type="button" id="addHazardBtn" class="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100 transition-colors">
              📍 แจ้งจุดเสี่ยงใหม่
            </button>
            <button type="button" id="sosTriggerBtn" class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-extrabold shadow-sm hover:scale-105 transition-transform flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
              SOS ฉุกเฉิน
            </button>
          </div>
        </div>

        <!-- Interactive Map Visual Container -->
        <div class="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-gray-300 bg-slate-900 text-white select-none">
          <!-- Dark Mode Map Grid lines -->
          <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#6d5dfb_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <!-- Campus Landmarks -->
          <div class="absolute top-4 left-6 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] font-bold">
            🏢 อาคารเรียน E-Park (จุดเริ่มต้น)
          </div>
          <div class="absolute bottom-5 right-6 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] font-bold">
            🏠 หอพักนักศึกษา F1-F4 (ปลายทาง)
          </div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-900/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-blue-500/40 text-[10px] text-blue-300">
            👮 ป้อม รปภ. กลาง & กล้อง CCTV
          </div>

          <!-- Route SVG Paths -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <!-- Safe Route (Green / Purple glow) -->
            ${
              activeRoute === 'safewalk'
                ? `
              <path d="M 80 50 Q 220 70 340 150 T 600 240" fill="none" stroke="#6d5dfb" stroke-width="6" stroke-linecap="round" stroke-dasharray="8 8" class="animate-[dash_20s_linear_infinite]" opacity="0.9" />
              <path d="M 80 50 Q 220 70 340 150 T 600 240" fill="none" stroke="#a78bfa" stroke-width="2" />
            `
                : `
              <!-- Normal Unsafe Route (Red/Orange) -->
              <path d="M 80 50 L 260 210 L 600 240" fill="none" stroke="#f43f5e" stroke-width="4" stroke-dasharray="6 6" opacity="0.8" />
            `
            }
          </svg>

          <!-- Animated Walker Location Pin -->
          <div class="absolute top-[35%] left-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <span class="relative flex h-6 w-6">
              <span class="map-radar-pulse absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-6 w-6 bg-[#6d5dfb] border-2 border-white text-[11px] text-white items-center justify-center font-bold">🚶</span>
            </span>
            <span class="mt-1 px-2 py-0.5 rounded bg-black/75 text-[10px] font-bold text-white whitespace-nowrap">คุณอยู่ที่นี่ (GPS สด)</span>
          </div>

          <!-- Reported Hazards on Map -->
          ${reportedHazards
            .map(
              (h) => `
            <div class="absolute cursor-pointer group" style="top: ${h.y}; left: ${h.x};">
              <span class="w-7 h-7 rounded-full bg-rose-500/90 border border-white text-white text-xs grid place-items-center shadow-lg hover:scale-125 transition-transform">
                ⚠️
              </span>
              <span class="hidden group-hover:block absolute bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-[10px] text-white rounded shadow-lg whitespace-nowrap">
                ${h.title}
              </span>
            </div>
          `,
            )
            .join('')}

          <!-- SOS Alert Overlay if Active -->
          ${
            isSosActive
              ? `
            <div class="absolute inset-0 bg-red-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-pulse">
              <div class="w-16 h-16 rounded-full bg-red-600 text-white text-3xl grid place-items-center mb-3 shadow-2xl">
                🚨
              </div>
              <h3 class="text-xl font-bold text-white">แจ้งเตือนฉุกเฉิน SOS ทำงานแล้ว!</h3>
              <p class="text-xs text-red-200 mt-1 max-w-sm">พิกัด GPS ของคุณ (20.0451° N, 99.8962° E) ถูกส่งไปยังศูนย์ รปภ. มฟล. รถสายตรวจกำลังเดินทางมาถึงใน 2 นาที</p>
              <button type="button" id="cancelSosBtn" class="mt-4 px-4 py-2 rounded-xl bg-white text-red-600 font-bold text-xs hover:bg-gray-100">
                ยกเลิกการแจ้งเตือน (ทดสอบเสร็จแล้ว)
              </button>
            </div>
          `
              : ''
          }
        </div>

        <!-- Safety Stats Footer Bar -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="p-3 bg-white rounded-xl border border-gray-200 text-xs">
            <span class="text-gray-400 block text-[11px]">ดัชนีความปลอดภัยเส้นทาง</span>
            <strong class="text-sm ${activeRoute === 'safewalk' ? 'text-emerald-600' : 'text-rose-600'} font-bold">
              ${activeRoute === 'safewalk' ? '🟢 98/100 (ปลอดภัยสูง)' : '🔴 45/100 (มีจุดเสี่ยง 2 จุด)'}
            </strong>
          </div>
          <div class="p-3 bg-white rounded-xl border border-gray-200 text-xs">
            <span class="text-gray-400 block text-[11px]">Virtual Companion</span>
            <strong class="text-sm text-gray-800 font-bold">
              ${companionSharing ? 'แชร์ตำแหน่งกับเพื่อนแล้ว (Pitchaya S.)' : 'ปิดการแชร์'}
            </strong>
          </div>
          <div class="p-3 bg-white rounded-xl border border-gray-200 text-xs">
            <span class="text-gray-400 block text-[11px]">ไฟส่องสว่างตลอดทาง</span>
            <strong class="text-sm text-[#6d5dfb] font-bold">
              ${activeRoute === 'safewalk' ? 'สว่าง 100% (มีเสาไฟ 18 ต้น)' : 'สว่าง 35% (ทางมืด)'}
            </strong>
          </div>
        </div>
      </div>
    `

    canvas.querySelector('#routeSafeBtn')?.addEventListener('click', () => {
      activeRoute = 'safewalk'
      showToast?.('เปลี่ยนเป็นเส้นทาง SafeWalk สว่างและปลอดภัยสูงสุด 🛡️')
      render()
    })

    canvas.querySelector('#routeNormalBtn')?.addEventListener('click', () => {
      activeRoute = 'normal'
      showToast?.('คำเตือน: เส้นทางปกติมีจุดเสี่ยงและไฟดับ ⚠️')
      render()
    })

    canvas.querySelector('#addHazardBtn')?.addEventListener('click', () => {
      const newId = reportedHazards.length + 1
      reportedHazards.push({
        id: newId,
        title: `จุดเสี่ยงที่แจ้ง #${newId} (รอ รปภ. ตรวจสอบ)`,
        x: `${20 + Math.floor(Math.random() * 60)}%`,
        y: `${30 + Math.floor(Math.random() * 40)}%`,
        type: 'user',
      })
      showToast?.('บันทึกจุดเสี่ยงลงแผนที่กลางแล้ว ขอบคุณที่ช่วยดูแลความปลอดภัย! 📍')
      render()
    })

    canvas.querySelector('#sosTriggerBtn')?.addEventListener('click', () => {
      isSosActive = true
      showToast?.('🚨 ส่งสัญญาณ SOS ฉุกเฉินเรียบร้อย!')
      render()
    })

    canvas.querySelector('#cancelSosBtn')?.addEventListener('click', () => {
      isSosActive = false
      render()
    })
  }

  render()
}

// ─────────────────────────────────────────────────────────────
// 3. KasetSense — AI Plant Disease Detector Prototype
// ─────────────────────────────────────────────────────────────
function mountLeafScan(project, canvas, showToast) {
  const leafSamples = [
    {
      id: 'corn-rust',
      crop: 'ข้าวโพด',
      disease: 'โรคราสนิมข้าวโพด (Common Rust)',
      latin: 'Puccinia sorghi',
      confidence: 96.8,
      severity: 'ระยะเริ่มต้น (ตรวจพบจุดสปอร์ 14 จุด)',
      color: 'from-amber-700 via-amber-900 to-yellow-950',
      treatment: 'ใช้สารชีวภัณฑ์บาซิลลัส ซับทิลิส (BS) หรือสารสกัดสะเดา ฉีดพ่นทุก 5-7 วัน หลีกเลี่ยงสารเคมีอันตราย',
      emoji: '🌽',
    },
    {
      id: 'rice-blast',
      crop: 'ข้าวหอมมะลิ',
      disease: 'โรคไหม้ข้าว (Rice Blast)',
      latin: 'Magnaporthe oryzae',
      confidence: 94.2,
      severity: 'ระยะลุกลามปานกลาง (แผลรูปตาเบ็ด)',
      color: 'from-emerald-800 via-stone-800 to-amber-900',
      treatment: 'ลดการใส่ปุ๋ยไนโตรเจนสูงเกินไป ใช้เชื้อราไตรโคเดอร์มาควบคุมทางชีววิธี',
      emoji: '🌾',
    },
    {
      id: 'durian-blight',
      crop: 'ทุเรียนหมอนทอง',
      disease: 'โรคราใบติดทุเรียน (Rhizoctonia Blight)',
      latin: 'Rhizoctonia solani',
      confidence: 97.4,
      severity: 'ระยะแรกระบาด (ใบเริ่มไหม้เกรียมเป็นหย่อม)',
      color: 'from-yellow-900 via-amber-950 to-stone-900',
      treatment: 'ตัดแต่งกิ่งให้โปร่งเพื่อให้อากาศถ่ายเท พ่นคอปเปอร์ออกซีคลอไรด์หรือสารชีวภาพกำจัดเชื้อรา',
      emoji: '🍈',
    },
    {
      id: 'healthy',
      crop: 'มันสำปะหลัง',
      disease: 'พืชสมบูรณ์ แข็งแรง ไม่พบโรค (Healthy)',
      latin: 'Healthy Tissue',
      confidence: 99.1,
      severity: 'ใบเขียวสด โครงสร้างใบปกติ',
      color: 'from-emerald-700 via-green-800 to-teal-900',
      treatment: 'รักษาการให้น้ำและธาตุอาหารตามตารางมาตรฐาน ไม่จำเป็นต้องใช้สารกำจัดศัตรูพืช',
      emoji: '🌿',
    },
  ]

  let currentLeafIndex = 0
  let isScanning = false
  let scanComplete = false

  function render() {
    const leaf = leafSamples[currentLeafIndex]

    canvas.innerHTML = `
      <div class="space-y-4">
        <!-- Sample selector -->
        <div class="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-gray-200">
          <div>
            <span class="text-xs font-bold text-emerald-700 uppercase tracking-wide">🔬 AI Computer Vision Disease Scanner</span>
            <h4 class="text-sm font-bold text-gray-900">เลือกภาพตัวอย่างใบพืชเพื่อสแกน:</h4>
          </div>
          <div class="flex flex-wrap gap-2">
            ${leafSamples
              .map(
                (l, idx) => `
              <button type="button" class="leaf-select-btn px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                idx === currentLeafIndex ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }" data-idx="${idx}">
                ${l.emoji} ${l.crop}
              </button>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Scanner Canvas -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div class="md:col-span-6 relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-gradient-to-br ${leaf.color} p-4 flex flex-col justify-between border border-gray-200 shadow-inner">
            <div class="flex items-center justify-between z-10">
              <span class="px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white text-xs font-mono">
                CAMERA: 1080p RGB SENSOR
              </span>
              <span class="px-2 py-0.5 rounded bg-emerald-500 text-white text-[11px] font-bold">
                ${leaf.crop}
              </span>
            </div>

            <!-- Leaf Illustration in Center -->
            <div class="my-auto text-center z-10">
              <div class="text-6xl drop-shadow-xl select-none mb-1">${leaf.emoji}</div>
              <span class="text-xs font-bold text-white/90 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                ${leaf.disease}
              </span>
            </div>

            <!-- Laser Scanning Line -->
            ${isScanning ? '<div class="laser-scan-line absolute left-0 right-0 h-1 bg-emerald-400 shadow-[0_0_15px_#34d399] z-20"></div>' : ''}

            <!-- AI Bounding Box when complete -->
            ${
              scanComplete && !isScanning
                ? `
              <div class="absolute top-[28%] left-[25%] right-[25%] bottom-[25%] border-2 border-emerald-400 rounded-xl bg-emerald-500/10 flex items-start justify-between p-1.5 z-10">
                <span class="bg-emerald-500 text-white text-[10px] font-mono px-1.5 py-0.5 rounded font-bold">
                  AI: ${leaf.confidence}%
                </span>
              </div>
            `
                : ''
            }

            <div class="z-10 flex items-center justify-between">
              <span class="text-[11px] text-white/70">MFU Agritech AI Engine v2.4</span>
              <button type="button" id="startScanBtn" ${isScanning ? 'disabled' : ''} class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md transition-all">
                ${isScanning ? 'กำลังสแกน...' : '🔍 สแกนด้วย AI'}
              </button>
            </div>
          </div>

          <!-- Diagnosis Details -->
          <div class="md:col-span-6 bg-white rounded-2xl p-5 border border-gray-200 flex flex-col justify-between">
            ${
              scanComplete
                ? `
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="px-2 py-0.5 rounded text-[11px] font-bold ${leaf.id === 'healthy' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                    ผลการวินิจฉัยอัตโนมัติ
                  </span>
                  <span class="text-xs font-bold text-emerald-600">ความแม่นยำ ${leaf.confidence}%</span>
                </div>
                <div>
                  <h4 class="text-base font-bold text-gray-900">${leaf.disease}</h4>
                  <p class="text-xs text-gray-400 italic">${leaf.latin}</p>
                </div>
                <div class="p-3 bg-gray-50 rounded-xl text-xs space-y-1">
                  <div class="text-gray-500">ระดับความรุนแรง: <strong class="text-gray-800 font-semibold">${leaf.severity}</strong></div>
                  <div class="text-gray-500">พืชเป้าหมาย: <strong class="text-gray-800 font-semibold">${leaf.crop}</strong></div>
                </div>
                <div class="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs space-y-1">
                  <strong class="font-bold text-emerald-800">💡 แนวทางรักษาชีววิธี:</strong>
                  <p class="text-emerald-900 leading-relaxed">${leaf.treatment}</p>
                </div>
              </div>
            `
                : `
              <div class="my-auto text-center py-8 text-gray-400 space-y-2">
                <div class="text-4xl">🌱</div>
                <p class="text-xs">กดปุ่ม <strong>"สแกนด้วย AI"</strong> เพื่อจำลองการวิเคราะห์รอยโรคบนใบพืชและรับคำแนะนำการรักษา</p>
              </div>
            `
            }
          </div>
        </div>
      </div>
    `

    canvas.querySelectorAll('.leaf-select-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        currentLeafIndex = parseInt(btn.getAttribute('data-idx'), 10)
        scanComplete = false
        render()
      })
    })

    canvas.querySelector('#startScanBtn')?.addEventListener('click', () => {
      isScanning = true
      render()
      setTimeout(() => {
        isScanning = false
        scanComplete = true
        showToast?.('AI สแกนและวินิจฉัยโรคพืชสำเร็จ! 🌿')
        render()
      }, 1200)
    })
  }

  render()
}

// ─────────────────────────────────────────────────────────────
// 4. QueueMai — Canteen Queue & Rescue Food Prototype
// ─────────────────────────────────────────────────────────────
function mountCanteenQueue(project, canvas, showToast) {
  let selectedStall = 'ร้านข้าวมันไก่โกฮง'
  let isRescueBox = true
  let ticketGenerated = false
  let currentTicketNum = 'A-18'
  let waitMinutes = 4

  function render() {
    canvas.innerHTML = `
      <div class="space-y-4">
        <div class="p-4 bg-white rounded-2xl border border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span class="text-xs font-bold text-orange-600 uppercase tracking-wide">🍱 ระบบจองคิวโรงอาหาร & Blind Box กู้ชีพอาหาร</span>
            <h4 class="text-sm font-bold text-gray-900">เลือกเมนูและรับบัตรคิวดิจิทัลล่วงหน้า</h4>
          </div>
          <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
            🔥 ลดขยะอาหารไปแล้ว 128 จานวันนี้
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
          <!-- Selection panel -->
          <div class="md:col-span-6 bg-white rounded-2xl p-5 border border-gray-200 space-y-4">
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1.5">เลือกร้านค้าในโรงอาหาร:</label>
              <select id="stallSelect" class="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800">
                <option value="ร้านข้าวมันไก่โกฮง" ${selectedStall === 'ร้านข้าวมันไก่โกฮง' ? 'selected' : ''}>ร้านข้าวมันไก่โกฮง (คิวรอ 3 คิว)</option>
                <option value="ร้านข้าวแกงป้าพร" ${selectedStall === 'ร้านข้าวแกงป้าพร' ? 'selected' : ''}>ร้านข้าวแกงป้าพร (คิวรอ 1 คิว)</option>
                <option value="ร้านบะหมี่เกี๊ยวมังกรทอง" ${selectedStall === 'ร้านบะหมี่เกี๊ยวมังกรทอง' ? 'selected' : ''}>ร้านบะหมี่เกี๊ยวมังกรทอง (คิวรอ 5 คิว)</option>
              </select>
            </div>

            <!-- Happy hour box toggle -->
            <label class="flex items-start gap-3 p-3.5 rounded-xl border-2 border-orange-200 bg-orange-50/50 cursor-pointer">
              <input type="checkbox" id="rescueBoxCheck" ${isRescueBox ? 'checked' : ''} class="mt-0.5 rounded text-orange-500">
              <div class="text-xs">
                <strong class="font-bold text-orange-900 block">🎁 เลือก Happy Hour Rescue Box (-50%)</strong>
                <span class="text-orange-700">อาหารคุณภาพดี ราคาลด 50% ช่วยลดขยะอาหาร พร้อมรับ 20 Green Points!</span>
              </div>
            </label>

            <button type="button" id="getTicketBtn" class="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold text-xs shadow-md transition-all">
              🎟️ ออกบัตรคิวดิจิทัล & จองอาหาร
            </button>
          </div>

          <!-- Ticket Output -->
          <div class="md:col-span-6 bg-gradient-to-br from-orange-500 to-rose-600 rounded-2xl p-5 text-white flex flex-col justify-between shadow-md">
            ${
              ticketGenerated
                ? `
              <div class="bg-white text-gray-900 rounded-2xl p-5 shadow-xl space-y-3">
                <div class="flex items-center justify-between border-b pb-2">
                  <span class="text-xs font-bold text-orange-600">${selectedStall}</span>
                  <span class="text-[11px] text-gray-400">สั่งล่วงหน้าผ่าน QueueMai</span>
                </div>
                <div class="text-center py-2">
                  <span class="text-xs text-gray-400 uppercase tracking-widest">หมายเลขคิวของคุณ</span>
                  <h3 class="text-4xl font-extrabold text-[#17152b] tracking-tight my-1">${currentTicketNum}</h3>
                  <p class="text-xs text-emerald-600 font-semibold">สถานะ: กำลังปรุงอาหาร (เหลืออีก 2 คิว)</p>
                </div>
                <div class="p-3 bg-gray-50 rounded-xl text-xs space-y-1">
                  <div class="flex justify-between text-gray-600"><span>เวลารอประมาณ:</span><strong>${waitMinutes} นาที</strong></div>
                  <div class="flex justify-between text-gray-600"><span>รายการ:</span><strong>${isRescueBox ? 'Happy Hour Blind Box (ลด 50%)' : 'อาหารจานเดียวปกติ'}</strong></div>
                </div>
                <div class="text-center pt-1 text-[11px] text-gray-400">
                  📱 สแกน QR รับอาหารที่หน้าร้านเมื่อมีแจ้งเตือน
                </div>
              </div>
            `
                : `
              <div class="my-auto text-center py-8 space-y-2">
                <div class="text-4xl">🎫</div>
                <h4 class="font-bold text-sm">ยังไม่มีบัตรคิวที่เรียกดู</h4>
                <p class="text-xs text-white/80">กดปุ่ม <strong>"ออกบัตรคิวดิจิทัล"</strong> เพื่อทดลองจองอาหารและรับคิวจำลอง</p>
              </div>
            `
            }
          </div>
        </div>
      </div>
    `

    canvas.querySelector('#stallSelect')?.addEventListener('change', (e) => {
      selectedStall = e.target.value
    })

    canvas.querySelector('#rescueBoxCheck')?.addEventListener('change', (e) => {
      isRescueBox = e.target.checked
    })

    canvas.querySelector('#getTicketBtn')?.addEventListener('click', () => {
      ticketGenerated = true
      currentTicketNum = 'A-' + (12 + Math.floor(Math.random() * 15))
      waitMinutes = Math.floor(Math.random() * 5) + 3
      showToast?.('ออกบัตรคิวสำเร็จ! เดินไปรับอาหารตามเวลาได้เลย 🍱')
      render()
    })
  }

  render()
}

// ─────────────────────────────────────────────────────────────
// 5. FinBuddy — Gamified Budgeting Virtual Pet Prototype
// ─────────────────────────────────────────────────────────────
function mountGamifiedPet(project, canvas, showToast) {
  let petLevel = 3
  let petExp = 65
  let budgetBalance = 3250
  let petMood = 'happy'
  let petMessage = 'ยินดีต้อนรับเจ้านาย! วันนี้เราคุมงบได้ดีมากเลยนะ 🌟'

  function render() {
    canvas.innerHTML = `
      <div class="space-y-4">
        <!-- Budget Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="p-3.5 bg-white rounded-xl border border-gray-200">
            <span class="text-xs text-gray-400 block">งบคงเหลือสัปดาห์นี้</span>
            <strong class="text-lg font-extrabold text-[#26649c]">${budgetBalance.toLocaleString()} ฿</strong>
          </div>
          <div class="p-3.5 bg-white rounded-xl border border-gray-200">
            <span class="text-xs text-gray-400 block">เลเวลสัตว์เลี้ยง (FinBuddy)</span>
            <strong class="text-lg font-extrabold text-indigo-600">Lv. ${petLevel} (EXP: ${petExp}/100)</strong>
          </div>
          <div class="p-3.5 bg-white rounded-xl border border-gray-200">
            <span class="text-xs text-gray-400 block">อารมณ์สัตว์เลี้ยง</span>
            <strong class="text-lg font-extrabold ${petMood === 'shocked' ? 'text-rose-500' : 'text-emerald-600'}">
              ${petMood === 'shocked' ? '😱 ตกใจงบเกิน' : petMood === 'proud' ? '🤩 ภูมิใจมาก!' : '😄 มีความสุข'}
            </strong>
          </div>
        </div>

        <!-- Interactive Pet Stage -->
        <div class="relative h-64 rounded-2xl bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-100 border border-blue-200 p-6 flex flex-col items-center justify-center text-center shadow-inner overflow-hidden">
          <!-- Floating Dialogue Bubble -->
          <div class="bg-white/95 px-4 py-2 rounded-2xl border border-blue-200 shadow-md text-xs font-bold text-gray-800 mb-3 animate-bounce">
            💬 "${petMessage}"
          </div>

          <!-- Pet Avatar -->
          <div class="text-7xl select-none transition-transform hover:scale-110 cursor-pointer drop-shadow-lg" id="petAvatar">
            ${petMood === 'shocked' ? '🐲💦' : petMood === 'proud' ? '🐲✨' : '🐲💚'}
          </div>

          <!-- Actions -->
          <div class="flex flex-wrap items-center justify-center gap-2 mt-4">
            <button type="button" id="buyBobaBtn" class="px-3.5 py-1.5 rounded-xl bg-white border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-50 transition-colors shadow-xs">
              🧋 สั่งชานมไข่มุก (-65฿)
            </button>
            <button type="button" id="saveMoneyBtn" class="px-3.5 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-600 text-xs font-bold hover:bg-emerald-50 transition-colors shadow-xs">
              💰 ฝากเงินออม (+200฿)
            </button>
            <button type="button" id="splitBillBtn" class="px-3.5 py-1.5 rounded-xl bg-white border border-indigo-200 text-indigo-600 text-xs font-bold hover:bg-indigo-50 transition-colors shadow-xs">
              🧾 สแกนหารบิลกับเพื่อน (-80฿)
            </button>
          </div>
        </div>
      </div>
    `

    canvas.querySelector('#buyBobaBtn')?.addEventListener('click', () => {
      budgetBalance -= 65
      petMood = 'shocked'
      petMessage = 'ว้ากกก! ชานมแก้วที่ 3 ของสัปดาห์แล้วนะเจ้านาย งบขนมจะเกลี้ยงแล้ว!'
      showToast?.('บันทึกค่าชานม -65฿ น้องมังกรตกใจ! 🧋')
      render()
    })

    canvas.querySelector('#saveMoneyBtn')?.addEventListener('click', () => {
      budgetBalance += 200
      petExp += 25
      if (petExp >= 100) {
        petLevel++
        petExp = petExp - 100
        petMood = 'proud'
        petMessage = `ยินดีด้วย! FinBuddy เลเวลอัพเป็น Lv.${petLevel} แล้ว 🎉`
        showToast?.('สัตว์เลี้ยงเลเวลอัพ! EXP +25 🌟')
      } else {
        petMood = 'proud'
        petMessage = 'สุดยอดเลย! เงินออมเพิ่มขึ้นอีกแล้ว FinBuddy ดีใจมาก!'
        showToast?.('ออมเงิน +200฿ น้องมังกรได้รับ EXP! 💰')
      }
      render()
    })

    canvas.querySelector('#splitBillBtn')?.addEventListener('click', () => {
      budgetBalance -= 80
      petMood = 'happy'
      petMessage = 'หารบิลกับเพื่อนลงตัวพอดี ไม่ต้องสำรองจ่ายคนเดียว เยี่ยม!'
      showToast?.('หารบิลกับเพื่อนสำเร็จ -80฿ 🧾')
      render()
    })
  }

  render()
}

// ─────────────────────────────────────────────────────────────
// 6. MindSpace — Anonymous Peer Listener Chat Prototype
// ─────────────────────────────────────────────────────────────
function mountPeerChat(project, canvas, showToast) {
  let messages = [
    {
      sender: 'listener',
      name: 'Peer Listener #408',
      text: 'สวัสดีครับ ยินดีต้อนรับสู่พื้นที่ปลอดภัยนิรนาม วันนี้มีเรื่องอะไรที่ทำให้รู้สึกหนักใจหรืออยากระบายไหมครับ เราพร้อมรับฟังเสมอนะ 🌿',
    },
  ]

  function render() {
    canvas.innerHTML = `
      <div class="space-y-4">
        <div class="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-xs font-bold text-emerald-900">ห้องสนทนาปลอดภัย (เข้ารหัส ไม่บันทึกตัวตน 100%)</span>
          </div>
          <span class="text-[11px] text-emerald-700">มีผู้รับฟังผ่านการอบรมดูแล</span>
        </div>

        <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col h-72">
          <!-- Chat stream -->
          <div class="flex-1 p-4 overflow-y-auto space-y-3" id="peerChatStream">
            ${messages
              .map(
                (m) => `
              <div class="flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}">
                <span class="text-[10px] text-gray-400 mb-1 px-1">${m.name}</span>
                <div class="max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user' ? 'bg-[#059669] text-white rounded-br-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }">
                  ${m.text}
                </div>
              </div>
            `,
              )
              .join('')}
          </div>

          <!-- Quick prompts and Input -->
          <div class="p-3 bg-gray-50 border-t border-gray-100 space-y-2">
            <div class="flex flex-wrap gap-1.5">
              <button type="button" class="quick-prompt px-2.5 py-1 rounded-lg bg-white border text-[11px] text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors" data-msg="ช่วงนี้อ่านหนังสือสอบไม่ทัน เครียดจนนอนไม่ค่อยหลับ">
                "เครียดเรื่องสอบ นอนไม่หลับ"
              </button>
              <button type="button" class="quick-prompt px-2.5 py-1 rounded-lg bg-white border text-[11px] text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors" data-msg="รู้สึกหมดไฟกับการทำงานกลุ่ม เหมือนแบกอยู่คนเดียว">
                "รู้สึกหมดไฟ ทำงานกลุ่มคนเดียว"
              </button>
            </div>
            <form id="peerChatForm" class="flex gap-2">
              <input type="text" id="peerChatInput" placeholder="พิมพ์ข้อความที่อยากระบาย..." required class="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:border-emerald-500 outline-none bg-white">
              <button type="submit" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors">
                ส่ง
              </button>
            </form>
          </div>
        </div>
      </div>
    `

    const form = canvas.querySelector('#peerChatForm')
    const input = canvas.querySelector('#peerChatInput')
    const stream = canvas.querySelector('#peerChatStream')

    function sendUserMsg(msgText) {
      if (!msgText.trim()) return
      messages.push({
        sender: 'user',
        name: 'คุณ (นิรนาม)',
        text: msgText.trim(),
      })
      render()

      // Peer response simulation
      setTimeout(() => {
        messages.push({
          sender: 'listener',
          name: 'Peer Listener #408',
          text: 'ขอบคุณที่เปิดใจเล่าให้ฟังนะครับ ฟังดูแล้วเป็นช่วงที่เหนื่อยและต้องแบกรับอะไรไว้เยอะจริงๆ อยากให้ลองพักผ่อนสักครู่ ดื่มน้ำอุ่นๆ อย่าลืมใจดีกับตัวเองนะ เราอยู่ตรงนี้พร้อมฟังเสมอครับ 💚',
        })
        render()
        showToast?.('ได้รับข้อความตอบกลับจากผู้รับฟังแล้ว 🌿')
      }, 1000)
    }

    form?.addEventListener('submit', (e) => {
      e.preventDefault()
      const text = input.value
      input.value = ''
      sendUserMsg(text)
    })

    canvas.querySelectorAll('.quick-prompt').forEach((btn) => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-msg')
        sendUserMsg(text)
      })
    })

    if (stream) stream.scrollTop = stream.scrollHeight
  }

  render()
}

// ─────────────────────────────────────────────────────────────
// Design Gallery Renderer (สิ่งที่เขาพัฒนาขึ้นจริง)
// ─────────────────────────────────────────────────────────────
export function mountDesignGallery(project, galleryContainer, openLightbox) {
  if (!galleryContainer) return

  const images = project.galleryImages || []
  if (images.length === 0) {
    galleryContainer.innerHTML = `
      <div class="col-span-full py-12 text-center text-gray-400">
        <p class="text-sm">กำลังเตรียมภาพผลงานเพิ่มเติม</p>
      </div>
    `
    return
  }

  galleryContainer.innerHTML = images
    .map(
      (img, idx) => `
    <div class="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer" data-gallery-index="${idx}">
      <!-- Preview Banner Image / Mockup Card -->
      <div class="relative h-48 sm:h-52 bg-gradient-to-br ${img.gradient || project.bannerGradient} p-4 flex flex-col justify-between overflow-hidden">
        <div class="flex items-center justify-between z-10">
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide bg-black/40 text-white backdrop-blur-md">
            ${img.tag || 'UI Mockup'}
          </span>
          <span class="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 text-white grid place-items-center text-xs backdrop-blur-md">
            🔍
          </span>
        </div>

        <!-- Visual Art / Screen Preview Element -->
        <div class="z-10 text-center my-auto px-4">
          <div class="text-3xl mb-1">${img.icon || '📱'}</div>
          <h4 class="text-sm font-bold text-white drop-shadow-sm line-clamp-1">${img.title}</h4>
        </div>

        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
      </div>

      <!-- Caption -->
      <div class="p-3.5 bg-white">
        <strong class="text-xs font-bold text-gray-900 block truncate">${img.title}</strong>
        <p class="text-[11px] text-gray-500 line-clamp-2 mt-1">${img.caption}</p>
      </div>
    </div>
  `,
    )
    .join('')

  galleryContainer.querySelectorAll('[data-gallery-index]').forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-gallery-index'), 10)
      const item = images[idx]
      if (item && openLightbox) {
        openLightbox(item)
      }
    })
  })
}
