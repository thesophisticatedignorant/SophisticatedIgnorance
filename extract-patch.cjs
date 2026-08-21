const fs = require('fs');

const transcript = fs.readFileSync('/Users/thesophisticatedignorant/.gemini/antigravity-ide/brain/2ef731d4-18a2-4286-bf84-5063d9c7794a/.system_generated/logs/transcript_full.jsonl', 'utf8');

const lines = transcript.split('\n');
for (const line of lines) {
    if (!line) continue;
    try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
            for (const call of obj.tool_calls) {
                if (call.name === 'run_command' && call.arguments && call.arguments.CommandLine === 'git diff HEAD src/components/ProductDisplay.jsx src/components/ProductDisplay.scss') {
                    // we found the command call, but we need the response!
                }
            }
        }
        if (obj.type === 'TOOL_RESPONSE' && obj.content && obj.content.includes('git diff HEAD src/components/ProductDisplay.jsx src/components/ProductDisplay.scss')) {
            // this is the task log maybe?
        }
        
        // Actually, the tool response for `run_command` has `output` field inside `content`.
        if (obj.type === 'TOOL_RESPONSE' && obj.content && obj.content.includes('diff --git a/src/components/ProductDisplay.scss')) {
            fs.writeFileSync('/tmp/full_diff.patch', obj.content);
            console.log('Saved patch to /tmp/full_diff.patch');
        }
    } catch (e) {}
}
