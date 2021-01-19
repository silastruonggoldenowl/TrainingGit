const SentryCli = require('@sentry/cli');

async function createReleaseAndUpload() {
  const release = process.env.REACT_APP_SENTRY_RELEASE;
  if (!release) {
    console.warn('REACT_APP_SENTRY_RELEASE is not set');

    return;
  }

  const customSentryCli = new SentryCli();
  try {
    await customSentryCli.releases.new(release);

    await customSentryCli.releases.uploadSourceMaps(release, {
      include: ['build/static/js'],
      urlPrefix: '~/static/js',
      rewrite: false,
    });

    await customSentryCli.releases.finalize(release);
  } catch (e) {
    console.error('Source maps uploading failed:', e);
  }
}

createReleaseAndUpload();
