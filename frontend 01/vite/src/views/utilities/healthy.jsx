
import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import IconButton from "@mui/material/IconButton"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import CircularProgress from "@mui/material/CircularProgress"
import Alert from "@mui/material/Alert"
import Chip from "@mui/material/Chip"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from "@mui/icons-material/Cancel"
import ImageIcon from "@mui/icons-material/Image"
import CloseIcon from "@mui/icons-material/Close"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

export default function HealthyPackagesManagement() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingPackage, setEditingPackage] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration_days: "",
    price_cents: "",
    features: [],
    is_published: false,
  })
  const [selectedFiles, setSelectedFiles] = useState([])
  const [viewingImages, setViewingImages] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const API_BASE = "http://localhost:4000/api/admin"

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/healthy-packages`)
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.details || errorData?.message || "Failed to fetch healthy packages")
      }
      const data = await response.json()
      setPackages(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (pkg) => {
    if (pkg) {
      setEditingPackage(pkg)
      setFormData({
        name: pkg.name,
        description: pkg.description,
        duration_days: pkg.duration_days,
        price_cents: pkg.price_cents,
        features: Array.isArray(pkg.features) ? pkg.features : [],
        is_published: pkg.is_published,
      })
      setSelectedFiles([])
    } else {
      setEditingPackage(null)
      setFormData({
        name: "",
        description: "",
        duration_days: "",
        price_cents: "",
        features: [],
        is_published: false,
      })
      setSelectedFiles([])
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingPackage(null)
    setSelectedFiles([])
  }

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { title: "", details: "" }],
    })
  }

  const handleRemoveFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    })
  }

  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...formData.features]
    updatedFeatures[index][field] = value
    setFormData({ ...formData, features: updatedFeatures })
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(files)
  }

  const handleViewImages = (images, packageName) => {
    setViewingImages({ images, name: packageName })
    setCurrentImageIndex(0)
  }

  const handleCloseImageViewer = () => {
    setViewingImages(null)
    setCurrentImageIndex(0)
  }

  const handleNextImage = () => {
    if (viewingImages && currentImageIndex < viewingImages.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      const url = editingPackage ? `${API_BASE}/healthy-packages/${editingPackage.id}` : `${API_BASE}/healthy-packages`
      const method = editingPackage ? "PATCH" : "POST"

      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("duration_days", formData.duration_days)
      formDataToSend.append("price_cents", formData.price_cents)
      formDataToSend.append("is_published", formData.is_published)
      formDataToSend.append("features", JSON.stringify(formData.features.filter((f) => f.title.trim().length > 0)))

      selectedFiles.forEach((file) => {
        formDataToSend.append("images", file)
      })

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.details || errorData?.message || "Failed to save healthy package")
      }

      handleCloseDialog()
      fetchPackages()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this healthy package?")) return

    try {
      const response = await fetch(`${API_BASE}/healthy-packages/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.details || errorData?.message || "Failed to delete healthy package")
      }
      fetchPackages()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const formatPrice = (cents) => {
    return `$${(cents / 100).toFixed(2)}`
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <h2 className="text-2xl font-semibold text-foreground">Healthy Packages Management</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ bgcolor: "primary.main" }}
        >
          Add Package
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Images</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Duration (Days)</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Features</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Published</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <p className="text-muted-foreground">No healthy packages found. Create your first package!</p>
                </TableCell>
              </TableRow>
            ) : (
              packages.map((pkg) => (
                <TableRow key={pkg.id} hover>
                  <TableCell>
                    {Array.isArray(pkg.images) && pkg.images.length > 0 ? (
                      <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                        <img
                          src={pkg.images[0]?.url || pkg.images[0] || "/placeholder.svg"}
                          alt={pkg.images[0]?.caption || pkg.name}
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "cover",
                            borderRadius: 4,
                            cursor: "pointer",
                          }}
                          onClick={() => handleViewImages(pkg.images, pkg.name)}
                        />
                        {pkg.images.length > 1 && (
                          <Chip
                            label={`+${pkg.images.length - 1}`}
                            size="small"
                            onClick={() => handleViewImages(pkg.images, pkg.name)}
                            sx={{ cursor: "pointer" }}
                          />
                        )}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          bgcolor: "grey.200",
                          borderRadius: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ImageIcon sx={{ color: "grey.400" }} />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: 300 }}>{pkg.name}</TableCell>
                  <TableCell sx={{ width: 800 }}>
                    <p className="truncate">{pkg.description}</p>
                  </TableCell>
                  <TableCell>{pkg.duration_days}</TableCell>
                  <TableCell>{formatPrice(pkg.price_cents)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, width: 200 }}>
                      {Array.isArray(pkg.features) && pkg.features.length > 0 ? (
                        pkg.features
                          .slice(0, 2)
                          .map((feature, idx) => (
                            <Chip
                              key={idx}
                              label={feature.title || feature}
                              size="small"
                              title={feature.details || ""}
                            />
                          ))
                      ) : (
                        <span className="text-muted-foreground text-sm">No features</span>
                      )}
                      {pkg.features && pkg.features.length > 2 && (
                        <Chip label={`+${pkg.features.length - 2} more`} size="small" variant="outlined" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {pkg.is_published ? (
                      <CheckCircleIcon color="success" fontSize="small" />
                    ) : (
                      <CancelIcon color="disabled" fontSize="small" />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenDialog(pkg)} sx={{ mr: 1 }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(pkg.id)} color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingPackage ? "Edit Healthy Package" : "Add Healthy Package"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
              required
              
            />
            <TextField
              label="Duration (Days)"
              type="number"
              value={formData.duration_days}
              onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Price (in cents)"
              type="number"
              value={formData.price_cents}
              onChange={(e) => setFormData({ ...formData, price_cents: e.target.value })}
              fullWidth
              required
              helperText="Enter amount in cents (e.g., 9999 for $99.99)"
            />

            <Box>
              <label className="text-sm font-medium mb-2 block">Images</label>
              <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />} fullWidth sx={{ mb: 1 }}>
                Select Images
                <input type="file" hidden multiple accept="image/*" onChange={handleFileChange} />
              </Button>
              {selectedFiles.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <p className="text-sm text-muted-foreground mb-1">{selectedFiles.length} file(s) selected</p>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {selectedFiles.map((file, idx) => (
                      <Chip
                        key={idx}
                        label={file.name}
                        size="small"
                        onDelete={() => {
                          setSelectedFiles(selectedFiles.filter((_, i) => i !== idx))
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
              {editingPackage && editingPackage.images && editingPackage.images.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <p className="text-sm text-muted-foreground mb-1">Current images:</p>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {editingPackage.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img?.url || img || "/placeholder.svg"}
                        alt={img?.caption || `Image ${idx + 1}`}
                        style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
                      />
                    ))}
                  </Box>
                  <p className="text-xs text-muted-foreground mt-1">Upload new images to replace current ones</p>
                </Box>
              )}
            </Box>

            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <label className="text-sm font-medium">Features</label>
                <Button size="small" onClick={handleAddFeature} startIcon={<AddIcon />}>
                  Add Feature
                </Button>
              </Box>
              {formData.features.length === 0 ? (
                <p className="text-sm text-muted-foreground">No features added yet</p>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {formData.features.map((feature, index) => (
                    <Paper key={index} sx={{ p: 2, bgcolor: "grey.50" }}>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span className="text-sm font-medium">Feature {index + 1}</span>
                          <IconButton size="small" onClick={() => handleRemoveFeature(index)} color="error">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <TextField
                          label="Title"
                          value={feature.title}
                          onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                          fullWidth
                          size="small"
                          required
                        />
                        <TextField
                          label="Details (optional)"
                          value={feature.details}
                          onChange={(e) => handleFeatureChange(index, "details", e.target.value)}
                          fullWidth
                          size="small"
                          multiline
                          rows={2}
                        />
                      </Box>
                    </Paper>
                  ))}
                </Box>
              )}
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                />
              }
              label="Published"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name || !formData.description || !formData.duration_days || !formData.price_cents}
          >
            {editingPackage ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!viewingImages} onClose={handleCloseImageViewer} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {viewingImages?.name} - Image {currentImageIndex + 1} of {viewingImages?.images.length}
          <IconButton onClick={handleCloseImageViewer} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <img
              src={
                viewingImages?.images[currentImageIndex]?.url ||
                viewingImages?.images[currentImageIndex] ||
                "/placeholder.svg"
              }
              alt={
                viewingImages?.images[currentImageIndex]?.caption || `${viewingImages?.name} ${currentImageIndex + 1}`
              }
              style={{ maxWidth: "100%", maxHeight: "60vh", objectFit: "contain" }}
            />
            {viewingImages?.images[currentImageIndex]?.caption && (
              <p className="text-sm text-muted-foreground">{viewingImages.images[currentImageIndex].caption}</p>
            )}
            {viewingImages && viewingImages.images.length > 1 && (
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Button onClick={handlePrevImage} disabled={currentImageIndex === 0} variant="outlined">
                  Previous
                </Button>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {viewingImages.images.map((_, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: idx === currentImageIndex ? "primary.main" : "grey.300",
                        cursor: "pointer",
                      }}
                      onClick={() => setCurrentImageIndex(idx)}
                    />
                  ))}
                </Box>
                <Button
                  onClick={handleNextImage}
                  disabled={currentImageIndex === viewingImages.images.length - 1}
                  variant="outlined"
                >
                  Next
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
