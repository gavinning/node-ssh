const color = require('chalk')
const Client = require('ssh2').Client

class SSH {
    constructor(options) {
        this.ssh = new Client
        this.ssh.on('close', () => {
            console.log(`${options.host}:: Connection Closed`)
        })
        this.ssh.on('ready', function () {
            console.log(`${options.host}:: Connection Ready`)
            this.shell({
                term: process.env.TERM,
                rows: process.stdout.rows,
                cols: process.stdout.columns
            }, (err, stream) => {
                if (err) throw err
        
                stream.on('close', () => {
                    // Don't let process.stdin keep process alive since we no longer need it
                    process.stdin.unref()
                    this.end()
                })
        
                // Connect local stdin to remote stdin
                process.stdin.setRawMode(true)
                process.stdin.pipe(stream)
        
                // Connect remote output to local stdout
                stream.pipe(process.stdout)
                process.stdout.on('resize', () => {
                    // Let the remote end know when the local terminal has been resized
                    stream.setWindow(process.stdout.rows, process.stdout.columns, 0, 0)
                })
            })
        })
        this.ssh.on('error', (err) => {
            console.log()
            console.error(color.red('  Connect Error:', err.message))
            console.log()
        })
        this.ssh.connect(options)
    }

    static create() {
        return new SSH(...arguments)
    }
}

module.exports = options => {
    return SSH.create(options)
}
